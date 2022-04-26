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
  image: {
    type: String,
    required: true,
},
  location: {
      type: String,
      required: true,
  },
  bio: {
      type: String,
      required: true,
  }
}
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;