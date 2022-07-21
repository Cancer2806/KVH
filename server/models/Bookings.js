// Model will hold all bookings, linked to cottages and guests

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

const guestSchema = require('./Guests');
const cottageSchema = require('./Cottages');

const bookingsSchema = new Schema(
  {
    dateIn: {
      type: Date,
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
    },
    guestName: {
      type: [guestSchema],
      required: true,
    },
    cottageName: {
      type: [cottageSchema],
      required: true,
    },
    dateBooked: {
      type: Date,
      required: true,
    },
    dateConfirmed: {
      type: Date,
    },
    deposit: {
      type: Float,
    },
    balance: {
      type: Float,
    },
    numAdults: {
      type: Integer,
    },
    numChildren: {
      type: Integer,
    },
    numPets: {
      type: Integer,
    },
    payment: {
      type: String,
      // TO figure out how to gather and store card details securely
    },
    confirmation: {
      type: String,
      // link to the confirmation pdf or perhaps another file?  Perhaps just a boolean with display logic
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model('Booking', bookingsSchema);

module.exports = Booking;