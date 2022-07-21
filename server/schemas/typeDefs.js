// import apollo and define typeDefs for GraphQl
const { gql } = require('apollo-server-express');

// TODO develop typeDefs and Mutations as needed

const typeDefs = gql`
  type Cottage {
    _id: ID!
    cottageName: String!
    roomType: String!
    cottageDescription: String
    # amenities: [Amenity]
    maxGuests: Int!
    # images: [String]
    # bookings: [Booking]
  }

  type Amenity {
    _id: ID!
    amenityName: String!
    amenityDescription: String
  }

type Query {
  viewCottages: Cottage
}

type Mutation {
  updateCottage(
    cottageName: String!
    roomType: String!
    cottageDescription: String
    # amenities: [Amenity]
    maxGuests: Int!
    # images: [String]
    # bookings: [Booking]
  )
}
`;

module.exports = typeDefs;
