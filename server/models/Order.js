const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderRows: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    priceEach: {
      type: Number,
      required: true,
    }
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
    }
  },
  status: {
    type: String,
    enum: ['Registered', 'Processing', 'Shipped', 'Delivered'],
    default: 'Registered'
  },
  shippingPrice: {
    type: Number,
    default: 0,
  }
}, {
  timestamp: true
});



module.exports = mongoose.model('Order', OrderSchema);

