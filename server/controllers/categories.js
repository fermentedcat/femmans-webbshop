const Category = require('../models/Category');

exports.addNewCategory = (req, res, next) => {
  const {title, thumbnail, description} = req.body;
  const category = new Category({title, thumbnail, description});

  category.save((err, result) => {
    if (err) return res.status(400).end('Något gick fel');
    res.status(204).end();
  });
}
