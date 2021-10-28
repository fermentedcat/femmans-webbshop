const User = require('../models/User');
const format = require('../utils/format');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res, next) => {
  User.find().exec((err, users) => {
    if (err) res.sendStatus(400);

    if (users) res.status(200).json(users);
    else res.sendStatus(404);
  });
};

exports.tokenValidCheck = (req, res, next) => {
  res.sendStatus(202);
}

exports.getUserByToken = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email: email })
    res.status(200).json(user);
  } catch (error) {
    res.status(400).end();
  }
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .select('-password')
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).end();
    })
    .catch((err) => {
      res.status(400).end();
    });
};

exports.getCart = async (req, res, next) => {
  const email = req.user.email;

  try {
    const cart = await User.findOne({ email: email })
      .select('cart')
      .populate('cart.product')
      .exec();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email });
  if (user) {
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { email: data.email, role: user.role },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );
      return res.status(201).send(token);
    }
  }
  res.status(401).send('Login failed');
};

exports.addNewUser = (req, res, next) => {
  const data = req.body;
  const newUser = new User(data);

  newUser
    .save()
    .then(() => {
      const token = jwt.sign(
        { email: data.email, role: 'user' },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );
      res.status(201).send(token);
    })
    .catch((err) => {
      // let errors = format.validationErrors(err);
      res.status(400).json(err);
    });
};

exports.updateOneUser = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  User.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .select('-password')
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).end();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) res.status(204).json();
      else res.status(404).end();
    })
    .catch((err) => {
      res.status(400).end();
    });
};

exports.addToCart = async (req, res, next) => {
  const { email } = req.user;
  const cartItem = req.params.id;

  try {
    const item = await User.findOneAndUpdate(
      {
        email: email,
        'cart.product': { $ne: cartItem },
      },
      { $push: { cart: { product: cartItem, amount: 1 } } },
      { new: true }
    );

    if (item) res.status(200).json(item);

    else {
      const amount = await User.findOneAndUpdate(
        {
          email: email,
          'cart.product': cartItem,
        },
        { $inc: { 'cart.$.amount': 1 } },
        { new: true }
      );
      res.status(200).json(amount);
    }
  } catch (error) {
    res.sendStatus(400);
  }
};

exports.updateCart = async (req, res, next) => {
  const { email } = req.user;
  const cartItem = req.params.id;
  const amount = req.body.amount;

  try {
    const item = await User.findOneAndUpdate(
      {
        email: email,
        'cart.product': cartItem
      },
      { $set: { 'cart.$.amount': amount } },
      { new: true }
    )
    res.status(204).json(item);
  } catch (error) {
    res.sendStatus(400);
  }
}

exports.emptyCart = async (req, res, next) => {
  const { email } = req.user;

  try {
    const item = await User.findOneAndUpdate(
      { email: email },
      { $set: { 'cart': [] } },
      { new: true }
    )
    res.status(204).json();
  } catch (error) {
    res.sendStatus(400);
  }
}

exports.deleteFromCart = async (req, res, next) => {
  const { email } = req.user;
  const cartItem = req.params.id;

  const item = await User.findOneAndUpdate(
    { email: email },
    { $pull: { 'cart': { 'product': cartItem } } },
    { new: true }
  )
  res.status(204).json();
}
