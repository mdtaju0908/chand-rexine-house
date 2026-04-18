const express = require('express');
const router = express.Router();
const {
  getManufacturingOrders,
  createManufacturingOrder,
  updateManufacturingOrder,
  deleteManufacturingOrder,
} = require('../controllers/manufacturingController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router
  .route('/')
  .get(protect, admin, getManufacturingOrders)
  .post(protect, admin, createManufacturingOrder);
router
  .route('/:id')
  .put(protect, admin, updateManufacturingOrder)
  .delete(protect, admin, deleteManufacturingOrder);

module.exports = router;
