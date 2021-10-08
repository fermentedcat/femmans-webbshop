const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: 'Other',
  }],
  weight: Number,
  photos: [{
    type: String,
    default: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552_square.jpg'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
