const express = require('express');

const productRoutes = require('./routes/products');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/products', productRoutes);

app.listen(3000);
