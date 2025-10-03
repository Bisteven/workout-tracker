const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./users.routes');
const rutinasRoutes = require('./rutinas.routes');
const ejerciciosRoutes = require('./ejercicios.routes');
const asociacionRutinaEjercicioRoutes = require('./asociacion-rutina-ejercicio.routes');
const horarioEntrenamientoRoutes = require('./horario-entrenamiento.routes');
const resumenDesempenoProgresoRoutes = require('./resumen-desempeno-progreso.routes');

// Todas las rutas son públicas (sin autenticación)
router.use('/usuarios', usuariosRoutes);
router.use('/rutinas', rutinasRoutes);
router.use('/ejercicios', ejerciciosRoutes);
router.use('/rutinas', asociacionRutinaEjercicioRoutes); // Rutas anidadas para ejercicios de rutinas
router.use('/horario-entrenamiento', horarioEntrenamientoRoutes);
router.use('/resumen-desempeno-progreso', resumenDesempenoProgresoRoutes);

module.exports = router;