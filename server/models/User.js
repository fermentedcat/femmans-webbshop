// const { isEmail } = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isNotWhiteSpace, isEmail } = require('../utils/validator')


const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    validate: [isNotWhiteSpace, 'Invalid Format']
  },
  displayName: {
    type: String,
    required: true,
    validate: [isNotWhiteSpace, 'Invalid Format']
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Invalid Email']
  },
  address: {
    street: {
      type: String,
      required: true,
      validate: [isNotWhiteSpace, 'Invalid Format']
    },
    postalCode: {
      type: String,
      required: true,
      validate: [isNotWhiteSpace, 'Invalid Format']
    },
    city: {
      type: String,
      required: true,
      validate: [isNotWhiteSpace, 'Invalid Format']
    },
    country: {
      type: String,
      required: true,
      validate: [isNotWhiteSpace, 'Invalid Format']
    }
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not a supported role',
      default: 'user',
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);