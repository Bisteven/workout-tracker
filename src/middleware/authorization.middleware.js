// Middleware para verificar que el usuario solo puede acceder a sus propios datos

function verificarPropietario(req, res, next) {
  const usuarioId = req.usuario.id;
  const recursoUsuarioId = req.params.usuarioId || req.body.usuarioId;
  
  // Si no hay usuarioId en el recurso, permitir (para recursos globales)
  if (!recursoUsuarioId) {
    return next();
  }
  
  // Verificar que el usuario solo puede acceder a sus propios datos
  if (usuarioId !== recursoUsuarioId) {
    return res.status(403).json({ 
      error: 'No tienes permisos para acceder a este recurso' 
    });
  }
  
  next();
}

// Middleware específico para rutinas (verificar que el usuario es dueño de la rutina)
function verificarPropietarioRutina(req, res, next) {
  const usuarioId = req.usuario.id;
  const rutinaId = req.params.rutinaId || req.params.id;
  
  // Buscar la rutina para verificar el propietario
  const { rutinas } = require('../controllers/rutinas.controller');
  const rutina = rutinas.find(r => r.id === rutinaId);
  
  if (!rutina) {
    return res.status(404).json({ error: 'Rutina no encontrada' });
  }
  
  if (rutina.usuarioId !== usuarioId) {
    return res.status(403).json({ 
      error: 'No tienes permisos para acceder a esta rutina' 
    });
  }
  
  next();
}

// Middleware específico para horarios (verificar que el usuario es dueño del horario)
function verificarPropietarioHorario(req, res, next) {
  const usuarioId = req.usuario.id;
  const horarioId = req.params.id;
  
  // Buscar el horario para verificar el propietario
  const { horarios } = require('../controllers/horario-entrenamiento.controller');
  const horario = horarios.find(h => h.id === horarioId);
  
  if (!horario) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }
  
  if (horario.usuarioId !== usuarioId) {
    return res.status(403).json({ 
      error: 'No tienes permisos para acceder a este horario' 
    });
  }
  
  next();
}

// Middleware específico para progreso (verificar que el usuario es dueño del progreso)
function verificarPropietarioProgreso(req, res, next) {
  const usuarioId = req.usuario.id;
  const progresoId = req.params.id;
  
  // Buscar el progreso para verificar el propietario
  const { registrosProgreso } = require('../controllers/resumen-desempeno-progreso.controller');
  const progreso = registrosProgreso.find(p => p.id === progresoId);
  
  if (!progreso) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }
  
  if (progreso.usuarioId !== usuarioId) {
    return res.status(403).json({ 
      error: 'No tienes permisos para acceder a este progreso' 
    });
  }
  
  next();
}

module.exports = {
  verificarPropietario,
  verificarPropietarioRutina,
  verificarPropietarioHorario,
  verificarPropietarioProgreso
};

