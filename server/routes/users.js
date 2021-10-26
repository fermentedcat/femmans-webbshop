const express = require('express');
const userAuth = require("../utils/userAuth");
const adminAuth = require("../utils/adminAuth");

const { getAllUsers, addNewUser, getOneUser, updateOneUser, deleteOneUser, loginUser, addToCart, getCart, emptyCart } = require('../controllers/users')

const router = express.Router();

router.get('/', adminAuth, getAllUsers);
router.get('/cart', userAuth, getCart);
router.get('/:id', userAuth, getOneUser);
router.post('/login', loginUser);
router.post('/', addNewUser);
router.post('/cart/empty', userAuth, emptyCart);
router.post('/cart/:id', userAuth, addToCart)
router.post('/:id', userAuth, updateOneUser);
router.delete('/:id', adminAuth, deleteOneUser);

module.exports = router;