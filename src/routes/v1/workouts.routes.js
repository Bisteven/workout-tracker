const express = require('express');
const router = express.Router();
const {
  listWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout
} = require('../../controllers/workouts.controller');

router.get('/', listWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.patch('/:id', patchWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;


