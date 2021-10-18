const express = require('express');
const adminAuth = require("../utils/adminAuth");
const userAuth = require("../utils/userAuth");

const { getAllOrders, addNewOrder, deleteOneOrder, getOneOrder, updateOneOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', adminAuth, getAllOrders);
router.get('/:id', userAuth, getOneOrder);
router.post('/', userAuth, addNewOrder);
router.post('/:id', adminAuth, updateOneOrder);
router.delete('/:id', adminAuth, deleteOneOrder);

module.exports = router;