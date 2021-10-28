const Category = require('../models/Category');
const Product = require("../models/Product")
const format = require('../utils/format');

exports.getAllCategories = (req, res, next) => {
  Category.find()
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getOneCategory = (req, res, next) => {
  const id = req.params.id;
  Category.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.addNewCategory = (req, res, next) => {
  const { title, thumbnail, description } = req.body;
  const category = new Category({ title, thumbnail, description });

  category.save()
    .then((data) => {
      res.status(201).json(data);
    }).catch(err => {
      res.status(400).json(errors);
    });
}

exports.updateOneCategory = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Category.findByIdAndUpdate(id, data, { runValidators: true, new: true })
  .then((category) => {
    if (category) res.status(204).json(category);
    else res.status(404).end();
   })
  .catch(err => {
    let errors = format.validationErrors(err)
    res.status(400).json(errors);
  });
}

exports.deleteOneCategory = async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findOne({categories: req.params.id})
  if(product){
    console.log("You can't remove a category which is used in a product")
    return res.status(400).json()
  }

  Category.findByIdAndDelete(id)
  .then(() => {
   res.status(204).json();
  })
  .catch(err => {
   res.status(400).end();
  });
}