const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  }
}
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;