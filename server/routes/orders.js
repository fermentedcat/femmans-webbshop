const express = require('express');

const { getAllOrders, addNewOrder, deleteOneOrder, getOneOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOneOrder)
router.post('/', addNewOrder);

router.delete('/:id', deleteOneOrder);

module.exports = router;