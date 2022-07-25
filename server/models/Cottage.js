// Model for maintaing all the cottage details, including links to bookings and images

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// TODO either here or in separate file - passwords and hashing with bcrypt

// const bookingsSchema = require('./Bookings');
const Amenity = require('./Amenity');

const cottageSchema = new Schema(
  {
    cottageNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    cottageName: {
      type: String,
      required: true,
      unique: true,
    },
    cottageDescription: {
      type: String,
      required: true,
    },
    numRooms: {
      type: Number,
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
      // array of image addresses
      // TODO functionality to upload fresh images and remove unwanted images
    },
    baseRate: {
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
