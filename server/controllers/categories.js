const Category = require('../models/Category');

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
    .then(() => {
      res.staus(201);
    }).catch(err => {
      res.status(400).end()
    });
}

exports.deleteOneCategory = (req, res, next) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
  .then(() => {
   res.status(204).json();
  })
  .catch(err => {
   res.status(400).end();
  });
}