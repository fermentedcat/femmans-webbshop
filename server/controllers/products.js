const Product = require('../models/Product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate('categories')
    .exec((err, products) => {
      if (err) res.sendStatus(400);

      if (products) res.status(200).json(products);
      else res.sendStatus(404);
    });
}

exports.getOneProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .populate('categories', '_id title')
    .exec((err, product) => {
      if (err) res.sendStatus(400);

      if (product) res.status(200).json(product);
      else res.sendStatus(404);
    });
}

exports.addNewProduct = (req, res, next) => {
  const data = req.body;

  const newProduct = new Product(data);

  newProduct.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.status(400).end();
    });
}

