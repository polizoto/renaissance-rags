const mongoose = require('mongoose');

const { Schema } = mongoose;
const Costume = require('./Costume');

const vendorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  location: {
      type: String,
      required: true,
  },
  costumes: [Costume.schema]
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;