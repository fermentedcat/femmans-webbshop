const express = require('express');

const { getAllOrders, addNewOrder, getOneOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOneOrder)
router.post('/', addNewOrder);

module.exports = router;