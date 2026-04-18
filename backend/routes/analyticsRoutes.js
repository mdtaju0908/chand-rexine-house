const express = require('express');
const router = express.Router();
const { getAnalyticsDashboard } = require('../controllers/analyticsController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.get('/dashboard', protect, admin, getAnalyticsDashboard);

module.exports = router;
