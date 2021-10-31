const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orderRows: [{
    productTitle: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    priceEach: {
      type: Number,
      required: true,
    },
  }],
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
    },
  },
  status: {
    type: String,
    enum: ['Registered', 'Processing', 'Shipped', 'Delivered'],
    default: 'Registered',
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', OrderSchema);
