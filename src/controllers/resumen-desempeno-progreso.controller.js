// Controlador para resumen de desempeño y progreso del usuario
let registrosProgreso = [
  {
    id: "p1",
    usuarioId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    horarioId: "h1",
    rutinaId: "w1",
    fecha: "2025-09-15",
    duracionReal: 55, // en minutos
    caloriasQuemadas: 320,
    peso: 70.5, // peso del usuario en kg
    notas: "Entrenamiento intenso, me sentí muy bien",
    ejerciciosCompletados: [
      {
        ejercicioId: "e1",
        series: 3,
        repeticiones: 12,
        peso: 0,
        tiempoDescanso: 60,
        completado: true,
        pesoUsado: 0,
        repeticionesRealizadas: 12
      },
      {
        ejercicioId: "e2",
        series: 3,
        repeticiones: 15,
        peso: 0,
        tiempoDescanso: 45,
        completado: true,
        pesoUsado: 0,
        repeticionesRealizadas: 15
      }
    ],
    fechaCreacion: "2025-09-15T09:30:00Z"
  }
];

function listarProgreso(req, res) {
  const { usuarioId, rutinaId, fechaInicio, fechaFin, limite } = req.query;
  
  let resultado = registrosProgreso;
  
  if (usuarioId) {
    resultado = resultado.filter(p => p.usuarioId === usuarioId);
  }
  
  if (rutinaId) {
    resultado = resultado.filter(p => p.rutinaId === rutinaId);
  }
  
  if (fechaInicio && fechaFin) {
    resultado = resultado.filter(p => p.fecha >= fechaInicio && p.fecha <= fechaFin);
  }
  
  // Ordenar por fecha descendente (más recientes primero)
  resultado.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  
  // Limitar resultados
  const n = parseInt(limite);
  if (!Number.isNaN(n) && n > 0) {
    resultado = resultado.slice(0, n);
  }
  
  res.status(200).json(resultado);
}

function obtenerProgreso(req, res) {
  const { id } = req.params;
  const progreso = registrosProgreso.find(p => p.id === id);
  
  if (!progreso) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }
  
  res.status(200).json(progreso);
}

function registrarProgreso(req, res) {
  const { 
    usuarioId, 
    horarioId, 
    rutinaId, 
    fecha, 
    duracionReal, 
    caloriasQuemadas, 
    peso, 
    notas, 
    ejerciciosCompletados 
  } = req.body;
  
  if (!usuarioId || !rutinaId || !fecha) {
    return res.status(400).json({ 
      error: 'UsuarioId, rutinaId y fecha son requeridos' 
    });
  }
  
  // Validar formato de fecha
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
  }
  
  const nuevoProgreso = {
    id: `${Date.now()}`,
    usuarioId,
    horarioId: horarioId || null,
    rutinaId,
    fecha,
    duracionReal: parseInt(duracionReal) || 0,
    caloriasQuemadas: parseInt(caloriasQuemadas) || 0,
    peso: parseFloat(peso) || null,
    notas: notas || '',
    ejerciciosCompletados: ejerciciosCompletados || [],
    fechaCreacion: new Date().toISOString()
  };
  
  registrosProgreso.push(nuevoProgreso);
  res.status(201).json(nuevoProgreso);
}

function actualizarProgreso(req, res) {
  const { id } = req.params;
  const { 
    duracionReal, 
    caloriasQuemadas, 
    peso, 
    notas, 
    ejerciciosCompletados 
  } = req.body;
  
  const indice = registrosProgreso.findIndex(p => p.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }
  
  registrosProgreso[indice] = {
    ...registrosProgreso[indice],
    duracionReal: parseInt(duracionReal) || registrosProgreso[indice].duracionReal,
    caloriasQuemadas: parseInt(caloriasQuemadas) || registrosProgreso[indice].caloriasQuemadas,
    peso: parseFloat(peso) || registrosProgreso[indice].peso,
    notas: notas || registrosProgreso[indice].notas,
    ejerciciosCompletados: ejerciciosCompletados || registrosProgreso[indice].ejerciciosCompletados
  };
  
  res.status(200).json(registrosProgreso[indice]);
}

function eliminarProgreso(req, res) {
  const { id } = req.params;
  const indice = registrosProgreso.findIndex(p => p.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }
  
  registrosProgreso.splice(indice, 1);
  res.status(204).send();
}

function obtenerResumenProgreso(req, res) {
  const { usuarioId, periodo = 30 } = req.query; // periodo en días
  
  if (!usuarioId) {
    return res.status(400).json({ error: 'UsuarioId es requerido' });
  }
  
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - parseInt(periodo));
  const fechaLimiteStr = fechaLimite.toISOString().split('T')[0];
  
  const progresoUsuario = registrosProgreso.filter(p => 
    p.usuarioId === usuarioId && p.fecha >= fechaLimiteStr
  );
  
  // Calcular estadísticas
  const totalEntrenamientos = progresoUsuario.length;
  const totalCalorias = progresoUsuario.reduce((sum, p) => sum + (p.caloriasQuemadas || 0), 0);
  const duracionPromedio = progresoUsuario.length > 0 
    ? progresoUsuario.reduce((sum, p) => sum + (p.duracionReal || 0), 0) / progresoUsuario.length 
    : 0;
  
  // Peso actual (último registro)
  const pesoActual = progresoUsuario.length > 0 
    ? progresoUsuario[progresoUsuario.length - 1].peso 
    : null;
  
  // Peso inicial (primer registro del período)
  const pesoInicial = progresoUsuario.length > 0 
    ? progresoUsuario[0].peso 
    : null;
  
  // Calcular cambio de peso
  const cambioPeso = pesoActual && pesoInicial ? pesoActual - pesoInicial : null;
  
  // Ejercicios más frecuentes
  const ejerciciosFrecuencia = {};
  progresoUsuario.forEach(registro => {
    registro.ejerciciosCompletados.forEach(ejercicio => {
      if (ejercicio.completado) {
        ejerciciosFrecuencia[ejercicio.ejercicioId] = 
          (ejerciciosFrecuencia[ejercicio.ejercicioId] || 0) + 1;
      }
    });
  });
  
  const ejercicioMasFrecuente = Object.keys(ejerciciosFrecuencia).reduce((a, b) => 
    ejerciciosFrecuencia[a] > ejerciciosFrecuencia[b] ? a : b, null
  );
  
  // Rutinas más usadas
  const rutinasFrecuencia = {};
  progresoUsuario.forEach(registro => {
    rutinasFrecuencia[registro.rutinaId] = 
      (rutinasFrecuencia[registro.rutinaId] || 0) + 1;
  });
  
  const rutinaMasUsada = Object.keys(rutinasFrecuencia).reduce((a, b) => 
    rutinasFrecuencia[a] > rutinasFrecuencia[b] ? a : b, null
  );
  
  // Progreso por semana
  const progresoSemanal = {};
  progresoUsuario.forEach(registro => {
    const fecha = new Date(registro.fecha);
    const semana = `${fecha.getFullYear()}-W${Math.ceil((fecha.getDate() - fecha.getDay() + 1) / 7)}`;
    if (!progresoSemanal[semana]) {
      progresoSemanal[semana] = {
        entrenamientos: 0,
        calorias: 0,
        duracion: 0
      };
    }
    progresoSemanal[semana].entrenamientos++;
    progresoSemanal[semana].calorias += registro.caloriasQuemadas || 0;
    progresoSemanal[semana].duracion += registro.duracionReal || 0;
  });
  
  const resumen = {
    periodo: `${periodo} días`,
    totalEntrenamientos,
    totalCalorias,
    duracionPromedio: Math.round(duracionPromedio),
    peso: {
      actual: pesoActual,
      inicial: pesoInicial,
      cambio: cambioPeso,
      tendencia: cambioPeso > 0 ? 'aumento' : cambioPeso < 0 ? 'disminucion' : 'estable'
    },
    ejercicios: {
      masFrecuente: ejercicioMasFrecuente,
      frecuencia: ejerciciosFrecuencia
    },
    rutinas: {
      masUsada: rutinaMasUsada,
      frecuencia: rutinasFrecuencia
    },
    progresoSemanal: Object.keys(progresoSemanal).map(semana => ({
      semana,
      ...progresoSemanal[semana]
    }))
  };
  
  res.status(200).json(resumen);
}

function obtenerEstadisticasEjercicio(req, res) {
  const { usuarioId, ejercicioId, periodo = 30 } = req.query;
  
  if (!usuarioId || !ejercicioId) {
    return res.status(400).json({ error: 'UsuarioId y ejercicioId son requeridos' });
  }
  
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - parseInt(periodo));
  const fechaLimiteStr = fechaLimite.toISOString().split('T')[0];
  
  const progresoUsuario = registrosProgreso.filter(p => 
    p.usuarioId === usuarioId && p.fecha >= fechaLimiteStr
  );
  
  const ejerciciosDelUsuario = [];
  progresoUsuario.forEach(registro => {
    registro.ejerciciosCompletados.forEach(ejercicio => {
      if (ejercicio.ejercicioId === ejercicioId && ejercicio.completado) {
        ejerciciosDelUsuario.push({
          fecha: registro.fecha,
          series: ejercicio.series,
          repeticiones: ejercicio.repeticionesRealizadas,
          peso: ejercicio.pesoUsado,
          duracion: registro.duracionReal
        });
      }
    });
  });
  
  if (ejerciciosDelUsuario.length === 0) {
    return res.status(404).json({ error: 'No se encontraron registros para este ejercicio' });
  }
  
  // Calcular estadísticas
  const totalSesiones = ejerciciosDelUsuario.length;
  const pesoMaximo = Math.max(...ejerciciosDelUsuario.map(e => e.peso));
  const pesoPromedio = ejerciciosDelUsuario.reduce((sum, e) => sum + e.peso, 0) / totalSesiones;
  const repeticionesPromedio = ejerciciosDelUsuario.reduce((sum, e) => sum + e.repeticiones, 0) / totalSesiones;
  
  // Progreso de peso a lo largo del tiempo
  const progresoPeso = ejerciciosDelUsuario.map(e => ({
    fecha: e.fecha,
    peso: e.peso,
    repeticiones: e.repeticiones
  }));
  
  const estadisticas = {
    ejercicioId,
    periodo: `${periodo} días`,
    totalSesiones,
    pesoMaximo,
    pesoPromedio: Math.round(pesoPromedio * 100) / 100,
    repeticionesPromedio: Math.round(repeticionesPromedio * 100) / 100,
    progresoPeso
  };
  
  res.status(200).json(estadisticas);
}

module.exports = {
  listarProgreso,
  obtenerProgreso,
  registrarProgreso,
  actualizarProgreso,
  eliminarProgreso,
  obtenerResumenProgreso,
  obtenerEstadisticasEjercicio
};
