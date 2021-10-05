const Category = require('../models/Category');

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

exports.getAllCategories = (req, res, next) => {
  Category.find()
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.deleteOneCategory = (req, res, next) => {
  const id = req.params.id;
  console.log('hello');
  //Category.findByIdAndDelete(id)
  //.then((data) => {
  //  res.json(data);
  //})
  //.catch(err => {
  //  console.log(err)
  //  res.status(400).end();
  //});
  res.end();
}