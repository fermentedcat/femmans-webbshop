const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) res.sendStatus(400);

    if (users) res.status(200).json(users);
    else res.sendStatus(404);
  });
};

exports.tokenValidCheck = (req, res) => {
  res.sendStatus(202);
};

exports.getUserByToken = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch {
    res.sendStatus(400);
  }
};

exports.getOneUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .select('-password')
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).end();
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.getCart = async (req, res) => {
  const { email } = req.user;

  try {
    const cart = await User.findOne({ email })
      .select('cart')
      .populate('cart.product')
      .exec();
    res.status(200).json(cart);
  } catch {
    res.sendStatus(400);
  }
};

exports.loginUser = async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email });
  if (user) {
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { email: data.email, role: user.role },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME },
      );
      res.status(201).send(token);
    }
  } else {
    res.sendStatus(401);
  }
};

exports.addNewUser = (req, res) => {
  const data = req.body;
  const newUser = new User(data);

  newUser
    .save()
    .then(() => {
      const token = jwt.sign(
        { email: data.email, role: 'user' },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME },
      );
      res.status(201).send(token);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.updateOneUser = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  User.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .select('-password')
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).end();
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.deleteOneUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) res.status(204).json();
      else res.status(404).end();
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.addToCart = async (req, res) => {
  const { email } = req.user;
  const cartItem = req.params.id;

  try {
    const item = await User.findOneAndUpdate(
      {
        email,
        'cart.product': { $ne: cartItem },
      },
      { $push: { cart: { product: cartItem, amount: 1 } } },
      { new: true },
    );

    if (item) res.sendStatus(200);

    else {
      const amount = await User.findOneAndUpdate(
        {
          email,
          'cart.product': cartItem,
        },
        { $inc: { 'cart.$.amount': 1 } },
        { new: true },
      );
      if (amount) res.sendStatus(200);
    }
  } catch {
    res.sendStatus(400);
  }
};

exports.updateCart = async (req, res) => {
  const { email } = req.user;
  const cartItem = req.params.id;
  const { amount } = req.body;

  try {
    const item = await User.findOneAndUpdate(
      {
        email,
        'cart.product': cartItem,
      },
      { $set: { 'cart.$.amount': amount } },
      { new: true },
    );
    res.status(204).json(item);
  } catch {
    res.sendStatus(400);
  }
};

exports.emptyCart = async (req, res) => {
  const { email } = req.user;

  try {
    await User.findOneAndUpdate(
      { email },
      { $set: { cart: [] } },
      { new: true },
    );
    res.sendStatus(204);
  } catch {
    res.sendStatus(400);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { email } = req.user;
  const cartItem = req.params.id;

  try {
    await User.findOneAndUpdate(
      { email },
      { $pull: { cart: { product: cartItem } } },
    );
    res.sendStatus(204);
  } catch {
    res.sendStatus(400);
  }
};