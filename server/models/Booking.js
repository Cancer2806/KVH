// Model will hold all bookings, linked by cottages and guests

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
  {
    checkin: {
      type: String,
      required: true,
    },
    checkout: {
      type: String,
      required: true,
    },
    dateConfirmed: {
      type: String,
    },
    amount: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    numAdults: {
      type: Number,
    },
    numChildren: {
      type: Number,
      default: 0
    },
    numPets: {
      type: Number,
      default: 0
    },
    paymentMethod: {
      type: String,
      // TODO figure out how to collect card details and email securely
    },
    status: {
      type: String,
      enum: ["Requested", "Confirmed", "Cancelled"],
      default: "Requested",
    },
    guestEmail: {
      type: String,
    },
    cottageName: {
      type: String,
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
