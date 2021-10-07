const Product = require('../models/Product');
const format = require('../utils/format');

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
      let errors = format.validationErrors(err)
      res.status(400).json(errors);
    });
}

exports.updateOneProduct = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Product.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .then((product) => {
      if (product) res.status(204).json(product);
      else res.sendStatus(404).end();
    })
    .catch(err => {
      let errors = format.validationErrors(err)
      res.status(400).json(errors);
    });
}


exports.deleteOneProduct = (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(400).end();
    });
}




