const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = (req, res) => {
  Product.find()
    .populate('categories')
    .exec((err, products) => {
      if (err) res.sendStatus(400);

      if (products) res.status(200).json(products);
      else res.sendStatus(404);
    });
};

exports.getOneProduct = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .populate('categories', '_id title')
    .exec((err, product) => {
      if (err) res.sendStatus(400);

      if (product) res.status(200).json(product);
      else res.sendStatus(404);
    });
};

exports.getProductsByCategory = async (req, res) => {
  const categoryTitle = req.params.title;
  try {
    const category = await Category.findOne({ title: { $regex: categoryTitle, $options: 'i' } }, '_id').exec();
    const products = await Product.find({ categories: category._id }).populate('categories').exec();
    if (products.length > 0) res.status(200).json(products);
    else res.sendStatus(404);
  } catch {
    res.sendStatus(400);
  }
};

exports.getProductsBySearch = async (req, res) => {
  const query = req.query.search;
  const queryObject = { $regex: query, $options: 'i' };
  const products = await Product.find({
    $or:
      [
        { title: queryObject },
        { brand: queryObject },
        { description: queryObject },
      ],
  })
    .populate('categories')
    .exec();
  if (products.length > 0) res.status(200).json(products);
  else res.sendStatus(404);
};

exports.addNewProduct = async (req, res) => {
  const data = req.body;

  const newProduct = new Product(data);
  try {
    const product = await newProduct.save();
    await product.populate('categories');
    res.status(200).json(product);
  } catch {
    res.sendStatus(400);
  }
};

exports.updateOneProduct = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Product.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .populate('categories')
    .exec((err, products) => {
      if (err) res.sendStatus(400);

      if (products) res.status(200).json(products);
      else res.sendStatus(404);
    });
};

exports.deleteOneProduct = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json();
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
