// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// Model for holding details of the business/property in which the cottages are built
const propertySchema = new Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    ABN: {
      type: String,
    },
    ACN: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    webAddress: {
      type: String,
      // TODO match criteria for valid URL
    },
    contact: {
      type: String,
      // Name of person to contact "Jesse or Frank"
    },
  },
  {
    timestamps: true,
  }
);


const Property = model('Property', propertySchema);

module.exports = Property;