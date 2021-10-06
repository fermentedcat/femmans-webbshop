const express = require('express');

const { getAllProducts, addNewProduct, deleteOneProduct } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.delete('/:id', deleteOneProduct)

module.exports = router;
