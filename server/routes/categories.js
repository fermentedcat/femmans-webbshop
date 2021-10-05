const express = require('express');

const { addNewCategory, getAllCategories, getOneCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', getAllCategories);

router.get('/:id', getOneCategory);

router.post('/', addNewCategory);

module.exports = router;