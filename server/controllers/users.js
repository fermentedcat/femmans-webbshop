const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec((err, users) => {
      if (err) res.sendStatus(400);

      if (users) res.status(200).json(users);
      else res.sendStatus(404);
    });
}

exports.addNewUser = (req, res, next) => {
  const data = req.body;
  const newUser = new User(data);

  newUser.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.status(400).end();
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