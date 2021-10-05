const express = require('express');

const { addNewCategory, getAllCategories, deleteOneCategory, getOneCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getOneCategory);
router.post('/', addNewCategory);
router.delete('/:id', deleteOneCategory);

module.exports = router;