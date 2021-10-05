const Product = require('../models/Product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate('categories')
    .exec((err, products) => {
      if (err) res.status(400).end();
      res.status(200).json(products).end();
    });
}



