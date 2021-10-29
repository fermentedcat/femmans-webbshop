const express = require('express');
const userAuth = require("../utils/userAuth");
const adminAuth = require("../utils/adminAuth");

const { getAllUsers, addNewUser, getUserByToken, getOneUser, updateOneUser, deleteOneUser, loginUser, addToCart, getCart, emptyCart, deleteFromCart, updateCart, tokenValidCheck } = require('../controllers/users')

const router = express.Router();

router.get('/', adminAuth, getAllUsers);
router.get('/cart', userAuth, getCart);
router.get('/auth', userAuth, tokenValidCheck);
router.get('/tokenUser', userAuth, getUserByToken);
router.get('/:id', userAuth, getOneUser);
router.post('/login', loginUser);
router.post('/', addNewUser);
router.post('/cart/update/:id', userAuth, updateCart)
router.post('/cart/empty', userAuth, emptyCart);
router.post('/cart/:id', userAuth, addToCart)
router.delete('/cart/:id', userAuth, deleteFromCart)
router.post('/:id', userAuth, updateOneUser);
router.delete('/:id', adminAuth, deleteOneUser);

module.exports = router;