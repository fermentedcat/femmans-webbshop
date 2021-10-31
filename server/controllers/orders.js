const Order = require('../models/Order');
const User = require('../models/User');

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('user', '-password')
    .exec((err, orders) => {
      if (err) {
        res.sendStatus(500);
      }
      res.json(orders);
    });
};

exports.getOneOrder = (req, res) => {
  const { id } = req.params;

  Order.findById(id)
    .populate('user', '-password')
    .then((order) => {
      if (order) res.status(200).json(order);
      else res.status(404).end();
    })
    .catch(() => {
      res.status(400).end();
    });
};

exports.getOrdersByUser = async (req, res) => {
  const userData = req.user;
  try {
    const user = await User.findOne({ email: userData.email }, '_id').exec();
    const orders = await Order.find({ user: user._id }).exec();
    res.status(200).json(orders);
  } catch {
    res.sendStatus(404);
  }
};

exports.addNewOrder = async (req, res) => {
  const data = req.body;
  const { email } = req.user;

  try {
    data.user = await User.findOne({ email }, '_id').exec();
    const order = new Order(data);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch {
    res.sendStatus(400);
  }
};

exports.updateOneOrder = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Order.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .then((order) => {
      if (order) res.status(200).json(order);
      else res.status(404).end();
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.deleteOneOrder = (req, res) => {
  const { id } = req.params;
  Order.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
