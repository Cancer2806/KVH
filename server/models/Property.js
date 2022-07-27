// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// Model for holding details of the business/property in which the cottages are built
const propertySchema = new Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyLogo: {
      type: String,
      // path to logo image
    },
    propertyDescription: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    postalAddress: {
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
    propertyEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    webAddress: {
      type: String,
      match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/],
    },
    contact: {
      type: String,
      // Name of person to contact
    },
    images: {
      // array of image addresses
      // TODO functionality to upload fresh images and remove unwanted images
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);


const Property = model('Property', propertySchema);

module.exports = Property;