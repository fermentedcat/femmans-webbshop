// const { isEmail } = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isNotWhiteSpace, isEmail } = require('../utils/validator');


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
    },
    default: 'user',
  },
  cart: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    amount: {
      type: Number
    }
  }]
}, {
  timestamps: true
});

UserSchema.pre('validate', function (next, done) {
  if (!this.isModified('email')) {
    return next();
  }
  this.constructor.findOne({ email: this.email })
    .then(user => {
      if (user) {
        const error = new Error('User Exists')
        next(error);
      }
      next();
    }
    );
});

UserSchema.pre('save', function (next, done) {
  bcrypt.hash(this.password, +process.env.SALT_ROUNDS, (err, hash) => {
    if (err) {
      const error = new Error('BCRYPT');
      next(error);
    }
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);