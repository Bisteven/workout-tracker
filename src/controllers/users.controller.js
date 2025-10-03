// Array de usuarios en memoria (simula base de datos)
let usuarios = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    nombre: "Estiven Cataño",
    email: "estiven@example.com",
    rol: "usuario",
    fechaCreacion: "2025-09-12T12:00:00Z"
  }
];

function obtenerUsuarios(req, res) {
  const { rol, busqueda } = req.query;

  let resultado = usuarios;

  if (rol) {
    resultado = resultado.filter(u => u.rol === rol);
  }

  if (busqueda) {
    const termino = String(busqueda).toLowerCase();
    resultado = resultado.filter(u =>
      (u.nombre && u.nombre.toLowerCase().includes(termino)) ||
      (u.email && u.email.toLowerCase().includes(termino))
    );
  }

  res.status(200).json(resultado);
}

function obtenerUsuarioPorId(req, res) {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.status(200).json(usuario);
}

function crearUsuario(req, res) {
  const { nombre, email, rol } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  const nuevoUsuario = {
    id: `${Date.now()}`,
    nombre,
    email,
    rol: rol || 'usuario',
    fechaCreacion: new Date().toISOString()
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
}

function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  usuarios[indice] = { ...usuarios[indice], nombre, email, rol };
  res.status(200).json(usuarios[indice]);
}

function actualizarUsuarioParcial(req, res) {
  const { id } = req.params;
  const actualizaciones = req.body || {};
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  if ('email' in actualizaciones && !actualizaciones.email) {
    return res.status(400).json({ error: 'Email no puede ser vacío' });
  }
  if ('nombre' in actualizaciones && !actualizaciones.nombre) {
    return res.status(400).json({ error: 'Nombre no puede ser vacío' });
  }
  usuarios[indice] = { ...usuarios[indice], ...actualizaciones };
  res.status(200).json(usuarios[indice]);
}

function eliminarUsuario(req, res) {
  const { id } = req.params;
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const usuarioEliminado = usuarios.splice(indice, 1);
  // 204 No Content para eliminaciones exitosas
  res.status(204).send();
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  actualizarUsuarioParcial
};


