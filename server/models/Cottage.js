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
      required: [true, `Please provide a cottage number`],
      unique: true,
    },
    cottageName: {
      type: String,
      required: [true, `Don't forget the cottage name`],
      unique: true,
    },
    cottageDescription: {
      type: String,
      required: [true, `Please include the cottage description`],
    },
    numRooms: {
      type: Number,
      required: [true, `How many rooms does the cottage have?`],
    },
    amenities: {
      type: Schema.Types.ObjectId,
      ref: 'Amenity'
    },
    maxGuests: {
      type: Number,
      required: [true, `What is the maximum number of guests`],
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
