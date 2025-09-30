const express = require('express');
const router = express.Router();
const {
  listExercises,
  getExercise,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
} = require('../../controllers/exercises.controller');

router.get('/', listExercises);
router.get('/:id', getExercise);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.patch('/:id', patchExercise);
router.delete('/:id', deleteExercise);

module.exports = router;


