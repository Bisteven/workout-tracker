const express = require('express');
const router = express.Router();
const {
  listarRutinas,
  obtenerRutina,
  crearRutina,
  actualizarRutina,
  actualizarRutinaParcial,
  eliminarRutina
} = require('../../controllers/rutinas.controller');

router.get('/', listarRutinas);
router.get('/:id', obtenerRutina);
router.post('/', crearRutina);
router.put('/:id', actualizarRutina);
router.patch('/:id', actualizarRutinaParcial);
router.delete('/:id', eliminarRutina);

module.exports = router;


