const express = require('express');

const { getAllProducts, addNewProduct } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);

module.exports = router;
