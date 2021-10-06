const express = require('express');

const { getAllOrders } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);

module.exports = router;