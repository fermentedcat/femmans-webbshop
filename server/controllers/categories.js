const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getAllCategories = (req, res) => {
  Category.find()
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.getOneCategory = (req, res) => {
  const { id } = req.params;
  Category.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.addNewCategory = (req, res) => {
  const { title, thumbnail, description } = req.body;
  const category = new Category({ title, thumbnail, description });

  category.save()
    .then((data) => {
      res.status(201).json(data);
    }).catch(() => {
      res.sendStatus(400);
    });
};

exports.updateOneCategory = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Category.findByIdAndUpdate(id, data, { runValidators: true, new: true })
    .then((category) => {
      if (category) res.status(204).json(category);
      else res.status(404).end();
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

exports.deleteOneCategory = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ categories: req.params.id });
  if (product) {
    res.sendStatus(405);
  } else {
    Category.findByIdAndDelete(id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  }
};
