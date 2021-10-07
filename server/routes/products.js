const express = require('express');

const { getAllProducts, addNewProduct, deleteOneProduct, updateOneProduct } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.post('/:id', updateOneProduct);
router.delete('/:id', deleteOneProduct);


module.exports = router;
