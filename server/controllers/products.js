const Product = require('../models/Product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate('categories')
    .exec((err, products) => {
      if (err) res.status(400).end();

      if (products) res.status(200).json(products).end();
      else res.status(404).end();
    });
}



