const express = require('express');
const router = express.Router();
const {
  listarEjerciciosDeRutina,
  obtenerEjercicioDeRutina,
  agregarEjercicioARutina,
  actualizarEjercicioDeRutina,
  actualizarEjercicioDeRutinaParcial,
  eliminarEjercicioDeRutina,
  reordenarEjerciciosDeRutina
} = require('../../controllers/asociacion-rutina-ejercicio.controller');

// GET /api/v1/rutinas/:rutinaId/ejercicios - Listar ejercicios de una rutina
router.get('/:rutinaId/ejercicios', listarEjerciciosDeRutina);

// POST /api/v1/rutinas/:rutinaId/ejercicios - Agregar ejercicio a una rutina
router.post('/:rutinaId/ejercicios', agregarEjercicioARutina);

// PUT /api/v1/rutinas/:rutinaId/ejercicios/reordenar - Reordenar ejercicios de una rutina
router.put('/:rutinaId/ejercicios/reordenar', reordenarEjerciciosDeRutina);

// GET /api/v1/rutinas/:rutinaId/ejercicios/:id - Obtener un ejercicio específico de una rutina
router.get('/:rutinaId/ejercicios/:id', obtenerEjercicioDeRutina);

// PUT /api/v1/rutinas/:rutinaId/ejercicios/:id - Actualizar ejercicio de una rutina
router.put('/:rutinaId/ejercicios/:id', actualizarEjercicioDeRutina);

// PATCH /api/v1/rutinas/:rutinaId/ejercicios/:id - Actualización parcial
router.patch('/:rutinaId/ejercicios/:id', actualizarEjercicioDeRutinaParcial);

// DELETE /api/v1/rutinas/:rutinaId/ejercicios/:id - Eliminar ejercicio de una rutina
router.delete('/:rutinaId/ejercicios/:id', eliminarEjercicioDeRutina);

module.exports = router;
