const Product = require('../models/Product');
const Category = require('../models/Category');
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

exports.getProductByCategory = async (req, res, next) => {
  const categoryTitle = req.params.title;

  try {
    const categoryId = await Category.findOne({ 'title': { '$regex': categoryTitle, $options: 'i' } }, '_id').exec();
    const products = await Product.find({ categories: categoryId }).popuulate('categories').exec();
    if (products.length > 0) res.status(200).json(products);
    else res.sendStatus(404);

  } catch (error) {
    res.sendStatus(400);
  }



  // Product.find({ categories: categoryId })
  //   .populate('categories')
  //   .exec((err, products) => {
  //     if (err) return res.sendStatus(400);

  //     if (products.length > 0) res.status(200).json(products);
  //     else res.sendStatus(404);
  //   });
}

exports.getProductsBySearch = async (req, res, next) => {
  const query = req.query.search;
  const queryObject = { $regex: query, $options: 'i' };
  const products = await Product.find({
    $or:
      [
        { title: queryObject },
        { brand: queryObject },
        { description: queryObject }
      ]
  })
    .populate('categories')
    .exec();
  if (products.length > 0) res.status(200).json(products);
  else res.sendStatus(404);
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




