const express = require('express');
const router = express.Router();
const {
  authUser,
  registerAdmin,
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
} = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/login', authUser);
router.post('/register', registerAdmin); // Keep for initial setup
router.route('/me').get(protect, getUserProfile);
router.route('/users').get(protect, getUsers).post(protect, createUser);
router.route('/users/:id').delete(protect, deleteUser);

module.exports = router;
