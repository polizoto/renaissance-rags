const mongoose = require('mongoose');

const { Schema } = mongoose;

const costumeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  vendor: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    }
},
{
  toJSON: {
    virtuals: true
  }
}
);

const Costume = mongoose.model('Costume', costumeSchema);

module.exports = Costume;