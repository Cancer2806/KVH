// File containing the resolvers for GraphQl routing
// Import required dependencies
const Cottage = require('../models/Cottages');
// const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    viewCottages: async (parent, args) => {
      const foundCottage = await find();
      return foundCottage;
    },
  },

  Mutation: {
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