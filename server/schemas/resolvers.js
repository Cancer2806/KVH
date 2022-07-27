// File containing the resolvers for GraphQl routing
// Import required dependencies
const Cottage = require('../models/Cottage');
const Amenity = require('../models/Amenity');
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');

const { signToken } = require('../utils/auth');

// function to check if the user is logged in
function checkLoggedIn(context) {
  const user = context.user;

  if (!user) {
    throw new Error(`User has not logged in`);
  };
  return user;
};

// Define resolvers for GraphQl
const resolvers = {
  Query: {
    viewCottages: async () => {
      return await Cottage.find({})
    },

    viewAmenities: async () => {
      return await Amenity.find({})
    },
    
    viewUsers: async () => {
      return await User.find({})
    },

    viewProperty: async () => {
      return await Property.find({})
    },

    viewBookings: async () => {
      return await Booking.find({})
    },

    me: async (parent, args, context) => {
      const user = checkLoggedIn(context);

      const foundUser = await User.findOne({ _id: user._id, });
      if (!foundUser) {
        throw new Error(`Cannot find User`);
      }
      return foundUser;
    },
  },

  Mutation: {
    // resolver for logging in a User
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error(`Login failure`);
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error(`Login failure`);
      }
      // Use same failure message to reduce chances for bad player
      const token = signToken(user);

      return { token, user };
    },

    // resolver for adding a new User profile
    addUser: async (parent, { firstName, lastName, userEmail, password }) => {
      const user = await User.create({
        firstName, lastName, userEmail, password
      });

      const token = signToken(user);

      return { token, user };
    },

    // resolver for adding a new Booking
    addBooking: async (parent, { checkIn, checkOut, numAdults, numChildren, amount }) => {
      const booking = await Booking.create({ checkIn, checkOut, numAdults, numChildren, amount });
      return { booking }
    },
      

    // resolver for updating Cottage details - admin only
    updateCottage: async (parent, { _id, cottageName }) => {

      try {
        const foundCottage = await Cottage.findOneAndUpdate(
          { cottageName: foundCottage.cottageName },
        );
        if (!foundCottage) {
          throw new Error(`Could not find user with this id`);
        }
        return foundCottage;
      } catch { error } {
        console.log(error);
        throw error;
      };
    },
  },
}

module.exports = resolvers;