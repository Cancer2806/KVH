// Model for maintaing all the cottage details, including links to bookings and images

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// TODO either here or in separate file - passwords and hashing with bcrypt

// const bookingsSchema = require('./Bookings');
const amenitiesSchema = require('./Amenity');

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
      type: Schema.Types.ObjectId,
      ref: 'Amenity'
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      // array of images or image addresses
    },
    rate: {
      type: Number,
      required: true,
    },
    // bookings: {
    //   type: [Booking.Schema],
    // },
  },
  {
    timeStamps: true,
  }
);

// TODO minStays parameter to be added.  

const Cottage = model('Cottage', cottageSchema);

module.exports = Cottage;
