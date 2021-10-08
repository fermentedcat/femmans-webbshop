const express = require('express');

const { getAllProducts, addNewProduct, deleteOneProduct, updateOneProduct, getOneProduct, getProductByCategory } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.get('/category/:id', getProductByCategory);
router.post('/', addNewProduct);
router.post('/:id', updateOneProduct);
router.delete('/:id', deleteOneProduct);

module.exports = router;