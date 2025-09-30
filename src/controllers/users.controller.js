// Estado en memoria (temporal). En un proyecto real vendría del servicio/DB.
let users = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Estiven Cataño",
    email: "estiven@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

function getUsers(req, res) {
  const { role, search } = req.query;

  let result = users;

  if (role) {
    result = result.filter(u => u.role === role);
  }

  if (search) {
    const term = String(search).toLowerCase();
    result = result.filter(u =>
      (u.name && u.name.toLowerCase().includes(term)) ||
      (u.email && u.email.toLowerCase().includes(term))
    );
  }

  res.status(200).json(result);
}

function getUserById(req, res) {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.status(200).json(user);
}

function createUser(req, res) {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }
  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    role: role || 'user',
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  res.status(201).json(newUser);
}

function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  if (!name || !email) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }
  users[index] = { ...users[index], name, email, role };
  res.status(200).json(users[index]);
}

function patchUser(req, res) {
  const { id } = req.params;
  const updates = req.body || {};
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  if ('email' in updates && !updates.email) {
    return res.status(400).json({ error: 'Email no puede ser vacío' });
  }
  if ('name' in updates && !updates.name) {
    return res.status(400).json({ error: 'Name no puede ser vacío' });
  }
  users[index] = { ...users[index], ...updates };
  res.status(200).json(users[index]);
}

function deleteUser(req, res) {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const deletedUser = users.splice(index, 1);
  // 204 No Content para eliminaciones exitosas
  res.status(204).send();
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  patchUser
};


