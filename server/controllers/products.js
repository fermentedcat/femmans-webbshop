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

exports.getProductByCategory = (req, res, next) => {
  const categoryId = req.params.id;
  Product.find({ categories: categoryId })
    .populate('categories')
    .exec((err, products) => {
      if (err) return res.sendStatus(400);

      if (products.length > 0) res.status(200).json(products);
      else res.sendStatus(404);
    });
}

exports.addNewProduct = (req, res, next) => {
  const data = req.body;

  const newProduct = new Product(data);

  newProduct.save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
}

exports.updateOneProduct = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Product.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .populate('categories')
    .exec((err, products) => {
      if (err) res.sendStatus(400);

      if (products) res.status(200).json(products);
      else res.sendStatus(404);
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




