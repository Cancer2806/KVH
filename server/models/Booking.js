// Model will hold all bookings, linked to cottages and guests

// It may be better to make this a sub-document of guests

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

const userSchema = require('./User');
const cottageSchema = require('./Cottage');

const bookingSchema = new Schema(
  {
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    // guest: 
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //   // required: true,
    //   },
    // cottage: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Cottage',
    //   // required: true,
    // },
    dateConfirmed: {
      type: Date,
    },
    amount: {
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
      // TODO figure out how to gather and store card details securely
      // or don't store, just email out as done now
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
