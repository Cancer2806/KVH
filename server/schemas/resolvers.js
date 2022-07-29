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
      return await Cottage.find({}).populate('bookings').populate('amenities');
    },

    viewAmenities: async () => {
      return await Amenity.find({})
    },
    
    viewUsers: async () => {
      return await User.find({}).populate('bookings')
    },

    viewProperty: async () => {
      return await Property.find({})
    },

    viewBookings: async () => {
      return await Booking.find({})
    },

    me: async (parent, args, context) => {
      const user = checkLoggedIn(context);

      const foundUser = await User.findOne({ _id: user._id, }).populate('bookings');
      if (!foundUser) {
        throw new Error(`Cannot find User`);
      }
      return foundUser;
    },
  },

  Mutation: {
    // resolver for logging in a User
    login: async (parent, { userEmail, password }) => {
      const user = await User.findOne({ userEmail: userEmail });
      if (!user) {
        throw new Error(`Login failure`);
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error(`Login failure`);
      }
      // Use same failure message to reduce chances for bad players
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
    addBooking: async (parent, { checkin, checkout, numAdults, numChildren, cottageName, amount }, context) => {
      const user = checkLoggedIn(context);
      
      if (context.user) {
        const guestEmail = user.userEmail
        console.log(`guestEmail: ${user.userEmail}`)
        console.dir(user)
        const booking = await Booking.create({ checkin, checkout, numAdults, numChildren, guestEmail, cottageName, amount });

        const updatedUser = await User.findOneAndUpdate(
          { userEmail: user.userEmail },
          {
            $addToSet: {
              bookings: booking._id,
            },
          }
        );
        const cottage = await Cottage.findOneAndUpdate(
          { cottageName: cottageName },
          {
            $addToSet: {
              bookings: booking._id,
            },
          }
        );
        return { booking };
      }
      throw new Error('You must be logged in to make a booking request');
    },
      

    // resolver for updating Cottage details - admin only
    // updateCottage: async (parent, { _id, cottageName }) => {

    //   try {
    //     const foundCottage = await Cottage.findOneAndUpdate(
    //       { cottageName: foundCottage.cottageName },
    //     );
    //     if (!foundCottage) {
    //       throw new Error(`Could not find cottage with this name`);
    //     }
    //     return foundCottage;
    //   } catch { error } {
    //     console.log(error);
    //     throw error;
    //   };
    // },
  },
}

module.exports = resolvers;