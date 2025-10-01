const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  iniciarSesion,
  verificarToken,
  renovarToken,
  cerrarSesion
} = require('../../controllers/autenticacion.controller');

// POST /api/v1/autenticacion/registro - Registrar nuevo usuario
router.post('/registro', registrarUsuario);

// POST /api/v1/autenticacion/login - Iniciar sesión
router.post('/login', iniciarSesion);

// GET /api/v1/autenticacion/verificar - Verificar token
router.get('/verificar', verificarToken);

// POST /api/v1/autenticacion/renovar - Renovar token
router.post('/renovar', renovarToken);

// POST /api/v1/autenticacion/logout - Cerrar sesión
router.post('/logout', cerrarSesion);

module.exports = router;

