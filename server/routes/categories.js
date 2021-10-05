const express = require('express');

const { addNewCategory } = require('../controllers/categories');

const router = express.Router();

router.post('/', addNewCategory);

module.exports = router;