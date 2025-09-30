const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  patchUser
} = require('../../controllers/users.controller');
  
// GET /api/v1/users (con filtros)
router.get('/', getUsers);

// GET /users/:id
router.get('/:id', getUserById);

// POST /users
router.post('/', createUser);

// PUT /users/:id
router.put('/:id', updateUser);

// PATCH /users/:id (actualización parcial)
router.patch('/:id', patchUser);

// DELETE /users/:id
router.delete('/:id', deleteUser);

 // GET /users?role=user&search=Carlos
router.get('/', (req, res) => {
    const { role, search } = req.query;  // 1
    let result = users;                  // 2
  
    if (role) {                          // 3
      result = result.filter(u => u.role === role);
    }
  
    if (search) {                        // 4
      result = result.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    res.status(200).json(result);        // 5
  });
  
  

module.exports = router;