const express = require('express');

const { getAllOrders, addNewOrder, deleteOneOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', addNewOrder);

router.delete('/:id', deleteOneOrder);

module.exports = router;