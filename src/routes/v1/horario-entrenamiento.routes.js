const express = require('express');
const router = express.Router();
const {
  listarHorarios,
  obtenerHorario,
  crearHorario,
  actualizarHorario,
  actualizarHorarioParcial,
  eliminarHorario,
  obtenerHorariosDelDia,
  obtenerProximosEntrenamientos
} = require('../../controllers/horario-entrenamiento.controller');

// GET /api/v1/horarios - Listar todos los horarios (con filtros)
router.get('/', listarHorarios);

// GET /api/v1/horarios/proximos - Obtener próximos entrenamientos
router.get('/proximos', obtenerProximosEntrenamientos);

// GET /api/v1/horarios/dia/:fecha - Obtener horarios de un día específico
router.get('/dia/:fecha', obtenerHorariosDelDia);

// GET /api/v1/horarios/:id - Obtener un horario específico
router.get('/:id', obtenerHorario);

// POST /api/v1/horarios - Crear nuevo horario
router.post('/', crearHorario);

// PUT /api/v1/horarios/:id - Actualizar horario completo
router.put('/:id', actualizarHorario);

// PATCH /api/v1/horarios/:id - Actualización parcial
router.patch('/:id', actualizarHorarioParcial);

// DELETE /api/v1/horarios/:id - Eliminar horario
router.delete('/:id', eliminarHorario);

module.exports = router;
