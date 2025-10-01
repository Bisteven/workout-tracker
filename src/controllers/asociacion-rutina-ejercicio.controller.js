// Controlador para la asociación entre rutinas y ejercicios con información adicional
let rutinaEjercicios = [
  {
    id: "re1",
    rutinaId: "w1",
    ejercicioId: "e1",
    series: 3,
    repeticiones: 12,
    peso: 0, // 0 para ejercicios sin peso
    tiempoDescanso: 60, // en segundos
    orden: 1,
    notas: "Mantener la forma correcta durante todo el movimiento",
    fechaCreacion: "2025-09-12T12:00:00Z"
  },
  {
    id: "re2",
    rutinaId: "w1",
    ejercicioId: "e2",
    series: 3,
    repeticiones: 15,
    peso: 0,
    tiempoDescanso: 45,
    orden: 2,
    notas: "Bajar hasta que los muslos estén paralelos al suelo",
    fechaCreacion: "2025-09-12T12:00:00Z"
  }
];

function listarEjerciciosDeRutina(req, res) {
  const { rutinaId } = req.params;
  const { ejercicioId, orden } = req.query;
  
  let resultado = rutinaEjercicios.filter(re => re.rutinaId === rutinaId);
  
  if (ejercicioId) {
    resultado = resultado.filter(re => re.ejercicioId === ejercicioId);
  }
  
  if (orden) {
    resultado = resultado.filter(re => re.orden === parseInt(orden));
  }
  
  // Ordenar por orden
  resultado.sort((a, b) => a.orden - b.orden);
  
  res.status(200).json(resultado);
}

function obtenerEjercicioDeRutina(req, res) {
  const { rutinaId, id } = req.params;
  const ejercicio = rutinaEjercicios.find(re => re.id === id && re.rutinaId === rutinaId);
  
  if (!ejercicio) {
    return res.status(404).json({ error: 'Ejercicio de rutina no encontrado' });
  }
  
  res.status(200).json(ejercicio);
}

function agregarEjercicioARutina(req, res) {
  const { rutinaId } = req.params;
  const { ejercicioId, series, repeticiones, peso, tiempoDescanso, orden, notas } = req.body;
  
  if (!ejercicioId || !series || !repeticiones) {
    return res.status(400).json({ 
      error: 'EjercicioId, series y repeticiones son requeridos' 
    });
  }
  
  const nuevoEjercicio = {
    id: `${Date.now()}`,
    rutinaId,
    ejercicioId,
    series: parseInt(series),
    repeticiones: parseInt(repeticiones),
    peso: parseFloat(peso) || 0,
    tiempoDescanso: parseInt(tiempoDescanso) || 60,
    orden: parseInt(orden) || 1,
    notas: notas || '',
    fechaCreacion: new Date().toISOString()
  };
  
  rutinaEjercicios.push(nuevoEjercicio);
  res.status(201).json(nuevoEjercicio);
}

function actualizarEjercicioDeRutina(req, res) {
  const { rutinaId, id } = req.params;
  const { series, repeticiones, peso, tiempoDescanso, orden, notas } = req.body;
  
  const indice = rutinaEjercicios.findIndex(re => re.id === id && re.rutinaId === rutinaId);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Ejercicio de rutina no encontrado' });
  }
  
  if (!series || !repeticiones) {
    return res.status(400).json({ 
      error: 'Series y repeticiones son requeridos' 
    });
  }
  
  rutinaEjercicios[indice] = {
    ...rutinaEjercicios[indice],
    series: parseInt(series),
    repeticiones: parseInt(repeticiones),
    peso: parseFloat(peso) || 0,
    tiempoDescanso: parseInt(tiempoDescanso) || 60,
    orden: parseInt(orden) || 1,
    notas: notas || ''
  };
  
  res.status(200).json(rutinaEjercicios[indice]);
}

function actualizarEjercicioDeRutinaParcial(req, res) {
  const { rutinaId, id } = req.params;
  const actualizaciones = req.body || {};
  
  const indice = rutinaEjercicios.findIndex(re => re.id === id && re.rutinaId === rutinaId);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Ejercicio de rutina no encontrado' });
  }
  
  // Convertir valores numéricos si están presentes
  if ('series' in actualizaciones) actualizaciones.series = parseInt(actualizaciones.series);
  if ('repeticiones' in actualizaciones) actualizaciones.repeticiones = parseInt(actualizaciones.repeticiones);
  if ('peso' in actualizaciones) actualizaciones.peso = parseFloat(actualizaciones.peso) || 0;
  if ('tiempoDescanso' in actualizaciones) actualizaciones.tiempoDescanso = parseInt(actualizaciones.tiempoDescanso);
  if ('orden' in actualizaciones) actualizaciones.orden = parseInt(actualizaciones.orden);
  
  rutinaEjercicios[indice] = { ...rutinaEjercicios[indice], ...actualizaciones };
  res.status(200).json(rutinaEjercicios[indice]);
}

function eliminarEjercicioDeRutina(req, res) {
  const { rutinaId, id } = req.params;
  const indice = rutinaEjercicios.findIndex(re => re.id === id && re.rutinaId === rutinaId);
  
  if (indice === -1) {
    return res.status(404).json({ error: 'Ejercicio de rutina no encontrado' });
  }
  
  rutinaEjercicios.splice(indice, 1);
  res.status(204).send();
}

function reordenarEjerciciosDeRutina(req, res) {
  const { rutinaId } = req.params;
  const { ejercicios } = req.body; // Array de objetos con {id, orden}
  
  if (!Array.isArray(ejercicios)) {
    return res.status(400).json({ error: 'Se requiere un array de ejercicios con sus nuevos órdenes' });
  }
  
  ejercicios.forEach(ejercicio => {
    const indice = rutinaEjercicios.findIndex(re => 
      re.id === ejercicio.id && re.rutinaId === rutinaId
    );
    
    if (indice !== -1) {
      rutinaEjercicios[indice].orden = parseInt(ejercicio.orden);
    }
  });
  
  res.status(200).json({ mensaje: 'Ejercicios reordenados correctamente' });
}

module.exports = {
  listarEjerciciosDeRutina,
  obtenerEjercicioDeRutina,
  agregarEjercicioARutina,
  actualizarEjercicioDeRutina,
  actualizarEjercicioDeRutinaParcial,
  eliminarEjercicioDeRutina,
  reordenarEjerciciosDeRutina
};
