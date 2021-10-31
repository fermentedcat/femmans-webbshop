const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: 'https://c.files.bbci.co.uk/14429/production/_118158928_gettyimages-507245091.jpg',
  },
  description: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', CategorySchema);
