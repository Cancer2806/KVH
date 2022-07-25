// Model will hold all bookings, linked to cottages and guests

// It may be better to make this a sub-document of guests

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

const userSchema = require('./User');
const cottageSchema = require('./Cottage');

const bookingSchema = new Schema(
  {
    dateIn: {
      type: Date,
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
    },
    guestName: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      // required: true,
      },
    ],
    cottageName: {
      type: Schema.Types.ObjectId,
      ref: 'Cottage',
      // required: true,
    },
    dateBooked: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateConfirmed: {
      type: Date,
    },
    deposit: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    numAdults: {
      type: Number,
    },
    numChildren: {
      type: Number,
    },
    numPets: {
      type: Number,
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

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
