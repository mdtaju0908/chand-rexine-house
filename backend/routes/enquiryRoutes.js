const express = require('express');
const router = express.Router();
const {
  createDealerEnquiry,
  getDealerEnquiries,
  updateDealerEnquiry,
  deleteDealerEnquiry,
  createRetailEnquiry,
  getRetailEnquiries,
  updateRetailEnquiry,
  deleteRetailEnquiry,
} = require('../controllers/enquiryController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// Dealer Enquiries
router.route('/dealer').post(createDealerEnquiry).get(protect, admin, getDealerEnquiries);
router
  .route('/dealer/:id')
  .put(protect, admin, updateDealerEnquiry)
  .delete(protect, admin, deleteDealerEnquiry);

// Retail Enquiries
router.route('/retail').post(createRetailEnquiry).get(protect, admin, getRetailEnquiries);
router
  .route('/retail/:id')
  .put(protect, admin, updateRetailEnquiry)
  .delete(protect, admin, deleteRetailEnquiry);

module.exports = router;
