const express = require('express');

const { getAllProducts, addNewProduct, getOneProduct } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/', addNewProduct);

module.exports = router;
