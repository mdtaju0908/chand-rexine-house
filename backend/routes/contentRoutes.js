const express = require('express');
const router = express.Router();
const {
  getContent,
  getContentBySection,
  updateContent,
  updateContentByKey,
  deleteContent,
  initContent
} = require('../controllers/contentController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/')
  .get(getContent)
  .post(protect, admin, updateContent);

router.route('/init')
  .post(protect, admin, initContent);

router.route('/:section')
  .get(getContentBySection);

router.route('/:key')
  .put(protect, admin, updateContentByKey);

router.route('/:id')
    .delete(protect, admin, deleteContent);

module.exports = router;
