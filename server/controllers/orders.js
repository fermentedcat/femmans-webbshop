const Order = require('../models/Order');

exports.getAllOrders = (req, res, next) => {

  Order.find()
    .populate('user', '-password')
    .populate('orderRows.product')
    .exec((err, orders) => {
      if (err) {
        res.sendStatus(500)
      }
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
      res.sendStatus(201)
    }).catch(err => {
      res.sendStatus(500)
    });
}

exports.deleteOneOrder = (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(400).end();
    });
}