let rutinas = [
  {
    id: "w1",
    usuarioId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    nombre: "Rutina Full Body",
    dificultad: "media",
    descripcion: "Rutina completa para trabajar todo el cuerpo",
    duracionEstimada: 60,
    categoria: "fuerza",
    fechaCreacion: "2025-09-12T12:00:00Z"
  }
];

function listarRutinas(req, res) {
  const { dificultad, busqueda, limite, categoria } = req.query;
  const usuarioId = req.usuario.id;
  
  // Filtrar solo las rutinas del usuario autenticado
  let resultado = rutinas.filter(r => r.usuarioId === usuarioId);
  
  if (dificultad) resultado = resultado.filter(r => r.dificultad === dificultad);
  if (categoria) resultado = resultado.filter(r => r.categoria === categoria);
  if (busqueda) {
    const termino = String(busqueda).toLowerCase();
    resultado = resultado.filter(r => r.nombre.toLowerCase().includes(termino));
  }
  const n = Number(limite);
  if (!Number.isNaN(n) && n > 0) resultado = resultado.slice(0, n);
  res.status(200).json(resultado);
}

function obtenerRutina(req, res) {
  const { id } = req.params;
  const usuarioId = req.usuario.id;
  const rutina = rutinas.find(r => r.id === id && r.usuarioId === usuarioId);
  if (!rutina) return res.status(404).json({ error: 'Rutina no encontrada' });
  res.status(200).json(rutina);
}

function crearRutina(req, res) {
  const { nombre, dificultad, descripcion, duracionEstimada, categoria } = req.body;
  const usuarioId = req.usuario.id;
  
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  const rutina = { 
    id: `${Date.now()}`, 
    usuarioId,
    nombre, 
    dificultad: dificultad || 'facil', 
    descripcion: descripcion || '',
    duracionEstimada: duracionEstimada || 30,
    categoria: categoria || 'general',
    fechaCreacion: new Date().toISOString() 
  };
  rutinas.push(rutina);
  res.status(201).json(rutina);
}

function actualizarRutina(req, res) {
  const { id } = req.params;
  const { nombre, dificultad, descripcion, duracionEstimada, categoria } = req.body;
  const usuarioId = req.usuario.id;
  const indice = rutinas.findIndex(r => r.id === id && r.usuarioId === usuarioId);
  if (indice === -1) return res.status(404).json({ error: 'Rutina no encontrada' });
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  rutinas[indice] = { ...rutinas[indice], nombre, dificultad, descripcion, duracionEstimada, categoria };
  res.status(200).json(rutinas[indice]);
}

function actualizarRutinaParcial(req, res) {
  const { id } = req.params;
  const actualizaciones = req.body || {};
  const usuarioId = req.usuario.id;
  const indice = rutinas.findIndex(r => r.id === id && r.usuarioId === usuarioId);
  if (indice === -1) return res.status(404).json({ error: 'Rutina no encontrada' });
  rutinas[indice] = { ...rutinas[indice], ...actualizaciones };
  res.status(200).json(rutinas[indice]);
}

function eliminarRutina(req, res) {
  const { id } = req.params;
  const usuarioId = req.usuario.id;
  const indice = rutinas.findIndex(r => r.id === id && r.usuarioId === usuarioId);
  if (indice === -1) return res.status(404).json({ error: 'Rutina no encontrada' });
  rutinas.splice(indice, 1);
  res.status(204).send();
}

module.exports = {
  listarRutinas,
  obtenerRutina,
  crearRutina,
  actualizarRutina,
  actualizarRutinaParcial,
  eliminarRutina
};


