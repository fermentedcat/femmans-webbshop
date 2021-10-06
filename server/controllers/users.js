const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec((err, users) => {
      if(err) res.sendStatus(400);

      if(users) res.status(200).json(users);
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