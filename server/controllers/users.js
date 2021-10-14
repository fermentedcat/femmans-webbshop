const User = require('../models/User');
const format = require('../utils/format');
const jwt = require('jsonwebtoken');

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec((err, users) => {
      if (err) res.sendStatus(400);

      if (users) res.status(200).json(users);
      else res.sendStatus(404);
    });
}

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .select('-password')
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).end();
    })
    .catch(err => {
      res.status(400).end();
    });
}

exports.addNewUser = (req, res, next) => {
  const data = req.body;
  const newUser = new User(data);

  newUser.save()
    .then(() => {

      const token = jwt.sign(
        { email: data.email, role: 'user' },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      )

      res.status(201).send(token);
    })
    .catch(err => {
      // let errors = format.validationErrors(err);
      res.status(400).json(err);
    });
}

exports.updateOneUser = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  User.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .select('-password')
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).end();
    })
    .catch(err => {
      let errors = format.validationErrors(err)
      res.status(400).json(errors);
    });
}

exports.deleteOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) res.status(204).json();
      else res.status(404).end();
    })
    .catch(err => {
      res.status(400).end();
    });
}