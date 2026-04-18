const express = require('express');
const router = express.Router();
const {
  getDealers,
  createDealer,
  updateDealer,
  deleteDealer,
} = require('../controllers/dealerController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, admin, getDealers).post(protect, admin, createDealer);
router
  .route('/:id')
  .put(protect, admin, updateDealer)
  .delete(protect, admin, deleteDealer);

module.exports = router;
