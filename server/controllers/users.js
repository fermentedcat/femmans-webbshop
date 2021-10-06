const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec((err, users) => {
      if(err) res.sendStatus(400);

      if(users) res.status(200).json(users);
      else res.sendStatus(404);
    });
}