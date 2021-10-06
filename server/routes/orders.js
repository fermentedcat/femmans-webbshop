const express = require('express');

const { getAllOrders, addNewOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', addNewOrder);

module.exports = router;