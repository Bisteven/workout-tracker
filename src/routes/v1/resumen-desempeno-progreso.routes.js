const express = require('express');
const router = express.Router();
const {
  listarProgreso,
  obtenerProgreso,
  registrarProgreso,
  actualizarProgreso,
  eliminarProgreso,
  obtenerResumenProgreso,
  obtenerEstadisticasEjercicio
} = require('../../controllers/resumen-desempeno-progreso.controller');

// GET /api/v1/progreso - Listar registros de progreso (con filtros)
router.get('/', listarProgreso);

// GET /api/v1/progreso/resumen - Obtener resumen de progreso del usuario
router.get('/resumen', obtenerResumenProgreso);

// GET /api/v1/progreso/ejercicio/estadisticas - Obtener estadísticas de un ejercicio específico
router.get('/ejercicio/estadisticas', obtenerEstadisticasEjercicio);

// GET /api/v1/progreso/:id - Obtener un registro de progreso específico
router.get('/:id', obtenerProgreso);

// POST /api/v1/progreso - Registrar nuevo progreso
router.post('/', registrarProgreso);

// PUT /api/v1/progreso/:id - Actualizar progreso completo
router.put('/:id', actualizarProgreso);

// DELETE /api/v1/progreso/:id - Eliminar progreso
router.delete('/:id', eliminarProgreso);

module.exports = router;
