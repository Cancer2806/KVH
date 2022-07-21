// Model for maintaing all the cottage details, including links to bookings and images

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// TODO either here or in separate file - passwords and hashing with bcrypt

const bookingsSchema = require('./Bookings');
const amenitiesSchema = require('./Amenities');

const cottageSchema = new Schema(
  {
    cottageName: {
      type: String,
      required: true,
      unique: true,
    },
    roomType: {
      type: String,
      required: true,
      // will be restricted to either one bedroom or two bedroom type
    },
    cottageDescription: {
      type: String,
      required: true,
    },
    amenities: {
      type: [amenitiesSchema],
    },
    maxGuests: {
      type: Integer,
      required: true,
    },
    images: {
      type: [images],
      // array of images or image addresses
    },
    rate: {
      type: Float,
      required: true,
    },
    bookings: {
      type: [bookingsSchema],
    },
  },
  {
    timeStamps: true,
  }
);

// TODO minStays parameter to be added.  

const Cottage = model('Cottage', userSchema);

module.exports = Cottage;
