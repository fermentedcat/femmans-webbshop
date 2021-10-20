const Order = require('../models/Order');
const User = require('../models/User');
const format = require('../utils/format');

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

exports.getOneOrder = (req, res, next) => {
  const id = req.params.id;

  Order.findById(id)
    .populate('user', '-password')
    .populate('orderRows.product')
    .then(order => {
      if (order) res.status(200).json(order);
      else res.status(404).end()
    })
    .catch(err => {
      res.status(400).end()
    });
}

exports.getOrdersByUser = async (req, res, next) => {
  const userData = req.user;
  const user = await User.findOne({ email: userData.email }, '_id').exec();
  const orders = await Order.find({ user: user._id }).exec();
  if (orders.length > 0) res.status(200).json(orders);
  else res.sendStatus(404);
}

exports.addNewOrder = (req, res, next) => {
  const orderData = {
    user: '615d68308e37dc66ae8bff1c',
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
    .then((data) => {
      res.sendStatus(201).json(data)
    }).catch(err => {
      let errors = format.validationErrors(err)
      res.status(400).json(errors);
    });
}

exports.updateOneOrder = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Order.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .then(order => {
      if (order) res.status(200).json(order);
      else res.status(404).end();
    })
    .catch((err) => {
      let errors = format.validationErrors(err)
      res.status(400).json(errors);
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