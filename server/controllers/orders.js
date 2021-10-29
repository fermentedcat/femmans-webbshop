const Order = require('../models/Order');
const User = require('../models/User');

exports.getAllOrders = (req, res, next) => {

  Order.find()
    .populate('user', '-password')
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
  try {
    const user = await User.findOne({ email: userData.email }, '_id').exec();
    const orders = await Order.find({ user: user._id }).exec();
    res.status(200).json(orders);
  } catch (error) {
    res.sendStatus(404);
  }
}

exports.addNewOrder = async (req, res, next) => {
  const data = req.body;
  const { email } = req.user;

  try {
    data.user = await User.findOne({ email }, '_id').exec();
    const order = new Order(data);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json(err);
  }
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
      res.status(400).json(err);
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