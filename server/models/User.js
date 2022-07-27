// Model for maintaining guest and admin details.  

// TODO  Add type of User (Visitor, Guest, Admin)

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


// A guest can book without registering so may not have a password
// An administrator must have a password...

// TODO link to Bookings or use Booking as a sub-document

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
      enum: ["visitor", "guest", "admin"],
      default: "guest"
    },
  },
  // set this to use virtual below
  {
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

// TODO record previous stays and details - perhaps through link to Bookings
// userSchema.virtual('numStays').get(function () {
  // return this.Bookings.length;
// });

const User = model('User', userSchema);

module.exports = User;
