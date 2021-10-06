const Order = require('../models/Order');

exports.getAllOrders = (req, res, next) => {

  Order.find()
    .populate('user')
    .exec((err, orders) => {
      console.log(err);
      res.json(orders);
    })
}