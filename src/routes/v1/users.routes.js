const express = require('express');
const router = express.Router();
const { verificarAutenticacion } = require('../../controllers/autenticacion.controller');
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  actualizarUsuarioParcial
} = require('../../controllers/users.controller');

// Aplicar middleware de autenticación a todas las rutas
router.use(verificarAutenticacion);
  
// GET /api/v1/usuarios (con filtros)
router.get('/', obtenerUsuarios);

// GET /usuarios/:id
router.get('/:id', obtenerUsuarioPorId);

// POST /usuarios
router.post('/', crearUsuario);

// PUT /usuarios/:id
router.put('/:id', actualizarUsuario);

// PATCH /usuarios/:id (actualización parcial)
router.patch('/:id', actualizarUsuarioParcial);

// DELETE /usuarios/:id
router.delete('/:id', eliminarUsuario);

module.exports = router;