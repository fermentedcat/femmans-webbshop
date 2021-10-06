const Order = require('../models/Order');

exports.getAllOrders = (req, res, next) => {

  Order.find()
    .populate('user')
    .exec((err, orders) => {
      console.log(err);
      res.json(orders);
    })
}

exports.addNewOrder = (req, res, next) => {
  const orderData = {
    user: '615d579c23f83bc71e9fc42e', 
    orderRows: {
      product: '615d5d2ba6ef1c864de35b81',
      amount: 1, 
      priceEach: 1000000
    },
    address: {
      street: 'Stoftgatan',
      postalCode: '08080',
      city: 'Stockholm',
      country: 'Sverige'
    },
  }
  const order = new Order(orderData);

  order.save()
    .then(() => {
      res.status(201);
    }).catch(err => {
      res.status(400).end()
    });
}