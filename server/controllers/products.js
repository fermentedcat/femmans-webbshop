const Product = require('../models/Product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate('categories', 'title')
    .exec((err, products) => {
      console.log(products);
    });
}



