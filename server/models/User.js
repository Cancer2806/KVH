// Model for maintaining guest and admin details.  

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// A guest must register before completing a booking
const Booking = require('./Booking');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      // required: true,
      minlength: 5
    },
    userType: {
      type: String,
      enum: ["guest", "admin"],
      default: "guest"
    },
    bookings: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
  },
  // set this to use virtual below
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Record number of previous stays - perhaps through link to Bookings
userSchema.virtual('numStays').get(function () {
  return this.bookings.length;
});

const User = model('User', userSchema);

module.exports = User;
