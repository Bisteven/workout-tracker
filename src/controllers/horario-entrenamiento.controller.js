// Controlador para horarios de entrenamiento
let horarios = [
  {
    id: "h1",
    usuarioId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    rutinaId: "w1",
    fecha: "2025-09-15",
    horaInicio: "08:00",
    horaFin: "09:00",
    estado: "programado", // programado, en_progreso, completado, cancelado
    notas: "Entrenamiento matutino",
    recordatorio: true,
    fechaCreacion: "2025-09-12T12:00:00Z"
  }
];

function listarHorarios(req, res) {
  const { usuarioId, rutinaId, fecha, estado, fechaInicio, fechaFin } = req.query;
  
  let resultado = horarios;
  
  if (usuarioId) {
    resultado = resultado.filter(h => h.usuarioId === usuarioId);
  }
  
  if (rutinaId) {
    resultado = resultado.filter(h => h.rutinaId === rutinaId);
  }
  
  if (fecha) {
    resultado = resultado.filter(h => h.fecha === fecha);
  }
  
  if (estado) {
    resultado = resultado.filter(h => h.estado === estado);
  }
  
  if (fechaInicio && fechaFin) {
    resultado = resultado.filter(h => h.fecha >= fechaInicio && h.fecha <= fechaFin);
  }
  
  // Ordenar por fecha y hora
  resultado.sort((a, b) => {
    const fechaA = new Date(`${a.fecha} ${a.horaInicio}`);
    const fechaB = new Date(`${b.fecha} ${b.horaInicio}`);
    return fechaA - fechaB;
  });
  
  res.status(200).json(resultado);
}

function obtenerHorario(req, res) {
  const { id } = req.params;
  const horario = horarios.find(h => h.id === id);
  
  if (!horario) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }
  
  res.status(200).json(horario);
}

function crearHorario(req, res) {
  const { usuarioId, rutinaId, fecha, horaInicio, horaFin, notas, recordatorio } = req.body;
  
  if (!usuarioId || !rutinaId || !fecha || !horaInicio) {
    return res.status(400).json({ 
      error: 'UsuarioId, rutinaId, fecha y horaInicio son requeridos' 
    });
  }
  
  // Validar formato de fecha (YYYY-MM-DD)
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
  }
  
  // Validar formato de hora (HH:MM)
  const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!horaRegex.test(horaInicio)) {
    return res.status(400).json({ error: 'Formato de hora inválido. Use HH:MM' });
  }
  
  if (horaFin && !horaRegex.test(horaFin)) {
    return res.status(400).json({ error: 'Formato de hora de fin inválido. Use HH:MM' });
  }
  
  const nuevoHorario = {
    id: `${Date.now()}`,
    usuarioId,
    rutinaId,
    fecha,
    horaInicio,
    horaFin: horaFin || null,
    estado: 'programado',
    notas: notas || '',
    recordatorio: recordatorio !== false,
    fechaCreacion: new Date().toISOString()
  };
  
  horarios.push(nuevoHorario);
  res.status(201).json(nuevoHorario);
}

function actualizarHorario(req, res) {
  const { id } = req.params;
  const { usuarioId, rutinaId, fecha, horaInicio, horaFin, estado, notas, recordatorio } = req.body;
  
  const indice = horarios.findIndex(h => h.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }
  
  if (!usuarioId || !rutinaId || !fecha || !horaInicio) {
    return res.status(400).json({ 
      error: 'UsuarioId, rutinaId, fecha y horaInicio son requeridos' 
    });
  }
  
  // Validar formato de fecha
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
  }
  
  // Validar formato de hora
  const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!horaRegex.test(horaInicio)) {
    return res.status(400).json({ error: 'Formato de hora inválido. Use HH:MM' });
  }
  
  if (horaFin && !horaRegex.test(horaFin)) {
    return res.status(400).json({ error: 'Formato de hora de fin inválido. Use HH:MM' });
  }
  
  // Validar estado
  const estadosValidos = ['programado', 'en_progreso', 'completado', 'cancelado'];
  if (estado && !estadosValidos.includes(estado)) {
    return res.status(400).json({ 
      error: 'Estado inválido. Estados válidos: programado, en_progreso, completado, cancelado' 
    });
  }
  
  horarios[indice] = {
    ...horarios[indice],
    usuarioId,
    rutinaId,
    fecha,
    horaInicio,
    horaFin: horaFin || null,
    estado: estado || 'programado',
    notas: notas || '',
    recordatorio: recordatorio !== false
  };
  
  res.status(200).json(horarios[indice]);
}

function actualizarHorarioParcial(req, res) {
  const { id } = req.params;
  const actualizaciones = req.body || {};
  
  const indice = horarios.findIndex(h => h.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }
  
  // Validar formato de fecha si se proporciona
  if (actualizaciones.fecha) {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(actualizaciones.fecha)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }
  }
  
  // Validar formato de hora si se proporciona
  const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (actualizaciones.horaInicio && !horaRegex.test(actualizaciones.horaInicio)) {
    return res.status(400).json({ error: 'Formato de hora inválido. Use HH:MM' });
  }
  
  if (actualizaciones.horaFin && !horaRegex.test(actualizaciones.horaFin)) {
    return res.status(400).json({ error: 'Formato de hora de fin inválido. Use HH:MM' });
  }
  
  // Validar estado si se proporciona
  if (actualizaciones.estado) {
    const estadosValidos = ['programado', 'en_progreso', 'completado', 'cancelado'];
    if (!estadosValidos.includes(actualizaciones.estado)) {
      return res.status(400).json({ 
        error: 'Estado inválido. Estados válidos: programado, en_progreso, completado, cancelado' 
      });
    }
  }
  
  horarios[indice] = { ...horarios[indice], ...actualizaciones };
  res.status(200).json(horarios[indice]);
}

function eliminarHorario(req, res) {
  const { id } = req.params;
  const indice = horarios.findIndex(h => h.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }
  
  horarios.splice(indice, 1);
  res.status(204).send();
}

function obtenerHorariosDelDia(req, res) {
  const { fecha } = req.params;
  const { usuarioId } = req.query;
  
  let resultado = horarios.filter(h => h.fecha === fecha);
  
  if (usuarioId) {
    resultado = resultado.filter(h => h.usuarioId === usuarioId);
  }
  
  // Ordenar por hora
  resultado.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  
  res.status(200).json(resultado);
}

function obtenerProximosEntrenamientos(req, res) {
  const { usuarioId, limite = 5 } = req.query;
  const hoy = new Date().toISOString().split('T')[0];
  
  let resultado = horarios.filter(h => h.fecha >= hoy);
  
  if (usuarioId) {
    resultado = resultado.filter(h => h.usuarioId === usuarioId);
  }
  
  // Ordenar por fecha y hora
  resultado.sort((a, b) => {
    const fechaA = new Date(`${a.fecha} ${a.horaInicio}`);
    const fechaB = new Date(`${b.fecha} ${b.horaInicio}`);
    return fechaA - fechaB;
  });
  
  // Limitar resultados
  const n = parseInt(limite);
  if (!Number.isNaN(n) && n > 0) {
    resultado = resultado.slice(0, n);
  }
  
  res.status(200).json(resultado);
}

module.exports = {
  listarHorarios,
  obtenerHorario,
  crearHorario,
  actualizarHorario,
  actualizarHorarioParcial,
  eliminarHorario,
  obtenerHorariosDelDia,
  obtenerProximosEntrenamientos
};
