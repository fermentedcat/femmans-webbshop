const express = require('express');

const { getAllOrders, addNewOrder, deleteOneOrder, getOneOrder, updateOneOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOneOrder);
router.post('/', addNewOrder);
router.post('/:id', updateOneOrder);
router.delete('/:id', deleteOneOrder);

module.exports = router;