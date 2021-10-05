const express = require('express');

const productsRoutes = require('./routes/products');
// const usersRoutes = require('./routes/users');
// const ordersRoutes = require('./routes/orders');
// const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/products', productsRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/orders', ordersRoutes);
// app.use('/api/categories', categoriesRoutes);
app.use('/', (req, res, next) => {
  res.status(404).send('Not found');
})

app.listen(3000);
