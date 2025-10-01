const { obtenerTodosLosEjercicios, obtenerCategorias, obtenerGruposMusculares, obtenerDificultades } = require('../seeders/ejercicios.seeder');

// Inicializar ejercicios desde el sembrador
let ejercicios = obtenerTodosLosEjercicios().map((ejercicio, index) => ({
  id: `e${index + 1}`,
  ...ejercicio,
  fechaCreacion: '2025-09-12T12:00:00Z'
}));

function listarEjercicios(req, res) {
  const { grupoMuscular, busqueda, limite } = req.query;
  let resultado = ejercicios;
  if (grupoMuscular) resultado = resultado.filter(e => e.grupoMuscular === grupoMuscular);
  if (busqueda) {
    const termino = String(busqueda).toLowerCase();
    resultado = resultado.filter(e => e.nombre.toLowerCase().includes(termino));
  }
  const n = Number(limite);
  if (!Number.isNaN(n) && n > 0) resultado = resultado.slice(0, n);
  res.status(200).json(resultado);
}

function obtenerEjercicio(req, res) {
  const { id } = req.params;
  const ejercicio = ejercicios.find(e => e.id === id);
  if (!ejercicio) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  res.status(200).json(ejercicio);
}

function crearEjercicio(req, res) {
  const { nombre, grupoMuscular, dificultad, descripcion, instrucciones } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  const ejercicio = { 
    id: `${Date.now()}`, 
    nombre, 
    grupoMuscular: grupoMuscular || 'general', 
    dificultad: dificultad || 'facil',
    descripcion: descripcion || '',
    instrucciones: instrucciones || '',
    fechaCreacion: new Date().toISOString() 
  };
  ejercicios.push(ejercicio);
  res.status(201).json(ejercicio);
}

function actualizarEjercicio(req, res) {
  const { id } = req.params;
  const { nombre, grupoMuscular, dificultad, descripcion, instrucciones } = req.body;
  const indice = ejercicios.findIndex(e => e.id === id);
  if (indice === -1) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  ejercicios[indice] = { ...ejercicios[indice], nombre, grupoMuscular, dificultad, descripcion, instrucciones };
  res.status(200).json(ejercicios[indice]);
}

function actualizarEjercicioParcial(req, res) {
  const { id } = req.params;
  const actualizaciones = req.body || {};
  const indice = ejercicios.findIndex(e => e.id === id);
  if (indice === -1) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  ejercicios[indice] = { ...ejercicios[indice], ...actualizaciones };
  res.status(200).json(ejercicios[indice]);
}

function eliminarEjercicio(req, res) {
  const { id } = req.params;
  const indice = ejercicios.findIndex(e => e.id === id);
  if (indice === -1) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  ejercicios.splice(indice, 1);
  res.status(204).send();
}

function obtenerCategoriasDisponibles(req, res) {
  const categorias = obtenerCategorias();
  res.status(200).json({
    categorias,
    total: categorias.length
  });
}

function obtenerGruposMuscularesDisponibles(req, res) {
  const grupos = obtenerGruposMusculares();
  res.status(200).json({
    gruposMusculares: grupos,
    total: grupos.length
  });
}

function obtenerDificultadesDisponibles(req, res) {
  const dificultades = obtenerDificultades();
  res.status(200).json({
    dificultades,
    total: dificultades.length
  });
}

module.exports = {
  listarEjercicios,
  obtenerEjercicio,
  crearEjercicio,
  actualizarEjercicio,
  actualizarEjercicioParcial,
  eliminarEjercicio,
  obtenerCategoriasDisponibles,
  obtenerGruposMuscularesDisponibles,
  obtenerDificultadesDisponibles
};


