let exercises = [
  { id: 'e1', name: 'Push Up', muscle: 'chest', difficulty: 'easy', createdAt: '2025-09-12T12:00:00Z' }
];

function listExercises(req, res) {
  const { muscle, search, limit } = req.query;
  let result = exercises;
  if (muscle) result = result.filter(e => e.muscle === muscle);
  if (search) {
    const term = String(search).toLowerCase();
    result = result.filter(e => e.name.toLowerCase().includes(term));
  }
  const n = Number(limit);
  if (!Number.isNaN(n) && n > 0) result = result.slice(0, n);
  res.status(200).json(result);
}

function getExercise(req, res) {
  const { id } = req.params;
  const e = exercises.find(e => e.id === id);
  if (!e) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  res.status(200).json(e);
}

function createExercise(req, res) {
  const { name, muscle, difficulty } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  const e = { id: `${Date.now()}`, name, muscle: muscle || 'general', difficulty: difficulty || 'easy', createdAt: new Date().toISOString() };
  exercises.push(e);
  res.status(201).json(e);
}

function updateExercise(req, res) {
  const { id } = req.params;
  const { name, muscle, difficulty } = req.body;
  const i = exercises.findIndex(e => e.id === id);
  if (i === -1) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  exercises[i] = { ...exercises[i], name, muscle, difficulty };
  res.status(200).json(exercises[i]);
}

function patchExercise(req, res) {
  const { id } = req.params;
  const updates = req.body || {};
  const i = exercises.findIndex(e => e.id === id);
  if (i === -1) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  exercises[i] = { ...exercises[i], ...updates };
  res.status(200).json(exercises[i]);
}

function deleteExercise(req, res) {
  const { id } = req.params;
  const i = exercises.findIndex(e => e.id === id);
  if (i === -1) return res.status(404).json({ error: 'Ejercicio no encontrado' });
  exercises.splice(i, 1);
  res.status(204).send();
}

module.exports = {
  listExercises,
  getExercise,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
};


