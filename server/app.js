const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(process.env.PORT);
