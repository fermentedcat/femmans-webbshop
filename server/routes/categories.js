const express = require('express');

const { addNewCategory, getAllCategories } = require('../controllers/categories');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addNewCategory);

module.exports = router;