const express = require('express');
const router = express.Router();
const {
  listarEjercicios,
  obtenerEjercicio,
  crearEjercicio,
  actualizarEjercicio,
  actualizarEjercicioParcial,
  eliminarEjercicio,
  obtenerCategoriasDisponibles,
  obtenerGruposMuscularesDisponibles,
  obtenerDificultadesDisponibles
} = require('../../controllers/ejercicios.controller');

// Rutas para metadatos (sin autenticación)
router.get('/categorias', obtenerCategoriasDisponibles);
router.get('/grupos-musculares', obtenerGruposMuscularesDisponibles);
router.get('/dificultades', obtenerDificultadesDisponibles);

// Rutas CRUD (con autenticación)
router.get('/', listarEjercicios);
router.get('/:id', obtenerEjercicio);
router.post('/', crearEjercicio);
router.put('/:id', actualizarEjercicio);
router.patch('/:id', actualizarEjercicioParcial);
router.delete('/:id', eliminarEjercicio);

module.exports = router;


