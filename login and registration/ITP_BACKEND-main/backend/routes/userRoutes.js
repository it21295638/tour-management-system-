const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getAll,deleteUser,getUserById,editUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', getAll)
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);

module.exports = router
