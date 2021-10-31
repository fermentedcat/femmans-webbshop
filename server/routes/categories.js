const express = require('express');
const adminAuth = require('../utils/adminAuth');

const {
  addNewCategory, getAllCategories, deleteOneCategory, getOneCategory, updateOneCategory,
} = require('../controllers/categories');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getOneCategory);
router.post('/', adminAuth, addNewCategory);
router.post('/:id', adminAuth, updateOneCategory);
router.delete('/:id', adminAuth, deleteOneCategory);

module.exports = router;
