const express = require('express');
const router = express.Router();


const v1Routes = require('./v1');

router.get('/', (req, res) => {
    res.json({
        "mensaje": "API de Seguimiento de Entrenamientos",
        "descripcion": "Sistema backend para seguimiento de entrenamientos con operaciones CRUD",
        "versiones": ["v1"],
        "endpoints": {
          "v1": "/api/v1"
        },
        "recursos": {
          "usuarios": "/api/v1/usuarios",
          "ejercicios": "/api/v1/ejercicios", 
          "rutinas": "/api/v1/rutinas",
          "asociacion-rutina-ejercicio": "/api/v1/rutinas/:rutinaId/ejercicios",
          "horario-entrenamiento": "/api/v1/horario-entrenamiento",
          "resumen-desempeno-progreso": "/api/v1/resumen-desempeno-progreso"
        }
      });

});

// Montar versión v1
router.use('/v1', v1Routes);

// Endpoint de demo de cabeceras
router.get('/headers-demo', (req, res) => {
    const contentType = req.get('Content-Type');
    const auth = req.get('Authorization');
    // Cabecera personalizada opcional
    const apiKey = req.get('X-API-Key');

    res.set('X-Service', 'WorkoutTracker');
    res.status(200).json({ contentType, auth, apiKey });
});

module.exports = router;