const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { port } = require('./config/env');

const app = express();

// Importar rutas
const routes = require('./routes');

// Middleware de seguridad
app.use(helmet());
app.use(cors());

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Configurar rutas con prefijo /api
app.use('/api', routes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
