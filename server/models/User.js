const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    populate: false,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
}, {
  timestamp: true
});

module.exports = mongoose.model('User', UserSchema);