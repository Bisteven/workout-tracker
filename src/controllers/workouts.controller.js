let workouts = [
  {
    id: "w1",
    name: "Full Body",
    difficulty: "medium",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

function listWorkouts(req, res) {
  const { difficulty, search, limit } = req.query;
  let result = workouts;
  if (difficulty) result = result.filter(w => w.difficulty === difficulty);
  if (search) {
    const term = String(search).toLowerCase();
    result = result.filter(w => w.name.toLowerCase().includes(term));
  }
  const n = Number(limit);
  if (!Number.isNaN(n) && n > 0) result = result.slice(0, n);
  res.status(200).json(result);
}

function getWorkout(req, res) {
  const { id } = req.params;
  const w = workouts.find(w => w.id === id);
  if (!w) return res.status(404).json({ error: 'Rutina no encontrada' });
  res.status(200).json(w);
}

function createWorkout(req, res) {
  const { name, difficulty } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  const w = { id: `${Date.now()}`, name, difficulty: difficulty || 'easy', createdAt: new Date().toISOString() };
  workouts.push(w);
  res.status(201).json(w);
}

function updateWorkout(req, res) {
  const { id } = req.params;
  const { name, difficulty } = req.body;
  const i = workouts.findIndex(w => w.id === id);
  if (i === -1) return res.status(404).json({ error: 'Rutina no encontrada' });
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  workouts[i] = { ...workouts[i], name, difficulty };
  res.status(200).json(workouts[i]);
}

function patchWorkout(req, res) {
  const { id } = req.params;
  const updates = req.body || {};
  const i = workouts.findIndex(w => w.id === id);
  if (i === -1) return res.status(404).json({ error: 'Rutina no encontrada' });
  workouts[i] = { ...workouts[i], ...updates };
  res.status(200).json(workouts[i]);
}

function deleteWorkout(req, res) {
  const { id } = req.params;
  const i = workouts.findIndex(w => w.id === id);
  if (i === -1) return res.status(404).json({ error: 'Rutina no encontrada' });
  workouts.splice(i, 1);
  res.status(204).send();
}

module.exports = {
  listWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout
};


