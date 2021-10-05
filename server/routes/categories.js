const express = require('express');

const { addNewCategory, getAllCategories, deleteOneCategory } = require('../controllers/categories');

const router = express.Router();

router.delete('/:id', deleteOneCategory);
router.get('/', getAllCategories);
router.post('/', addNewCategory);

module.exports = router;