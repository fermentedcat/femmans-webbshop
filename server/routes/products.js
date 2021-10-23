const express = require('express');
const adminAuth = require("../utils/adminAuth");
const userAuth = require("../utils/userAuth");

const { getAllProducts, addNewProduct, deleteOneProduct, updateOneProduct, getOneProduct, getProductByCategory, getProductsBySearch } = require('../controllers/products');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', getProductsBySearch);
router.get('/:id', getOneProduct);
router.get('/category/:id', getProductByCategory);
router.post('/', adminAuth, addNewProduct);
router.post('/:id', adminAuth, updateOneProduct);
router.delete('/:id', adminAuth, deleteOneProduct);

module.exports = router;