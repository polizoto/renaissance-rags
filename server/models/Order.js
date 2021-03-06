const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  costumes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Costume'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
