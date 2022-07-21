// Model for maintaining guest details.  May also contain administrator details

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// TODO either here or in separate file - passwords and hashing with bcrypt

// A guest can book without registering so may not have a password
// An administrator must have a password...

const guestSchema = new Schema(
  {
    guestName: {
      type: String,
      required: true,
      unique: true,
    },
    guestEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      // required: true,
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
guestSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
guestSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// TODO record previous stays and details - perhaps through link to Bookings

const Guest = model('Guest', guestSchema);

module.exports = Guest;
