const express = require('express');

const { getAllProducts, addNewProduct, updateOneProduct } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.post('/:id', updateOneProduct)
module.exports = router;
