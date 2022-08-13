// File containing the typeDefs for GraphQl/Apollo
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Cottage {
    _id: ID!
    cottageNumber: Int!
    cottageName: String!
    numRooms: Int!
    cottageDescription: String!
    amenities: [Amenity]
    maxGuests: Int!
    images: [String]
    baseRate: Float!
    bookings: [Booking]
  }

  type Amenity {
    _id: ID!
    amenityName: String!
    amenityDescription: String
    amenityType: String
  }

  type Property {
    _id: ID!
    propertyName: String!
    propertyLogo: String
    propertyDescription: String
    streetAddress: String
    postalAddress: String
    phoneNumber: String
    mobileNumber: String
    ABN: String
    ACN: String
    propertyEmail: String
    webAddress: String
    contact: String
    images: [String]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    userEmail: String!
    userType: String
    userPhone: String
    userSuburb: String
    userPostcode: String
    bookings: [Booking]
      # numStays: Int
  }

  type Booking {
    _id: ID!
    checkin: String!
    checkout: String!
    dateConfirmed: String
    numAdults: Int
    numChildren: Int
    numPets: Int
    guestEmail: String
    cottageName: String
    amount: Float
    status: String
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    viewCottages: [Cottage]
    viewCottage(_id: ID!): Cottage
    amenities: [Amenity]
    viewProperty: [Property]
    viewUsers: [User] 
    viewBookings: [Booking]
  }

type Mutation {
  login(
    userEmail: String!,
    password: String!
  ): Auth

  addUser(
    firstName: String!,
    lastName: String!,
    userEmail: String!,
    password: String!
  ): Auth

  addBooking(
    checkin: String!
    checkout: String!
    numAdults: Int
    numChildren: Int
    guestEmail: String
    cottageName: String
    amount: Float
  ): Booking
  
  addAmenity(
    amenityName: String!
    amenityDescription: String
    amenityType: String
  ): Amenity

  removeAmenity(
    amenityId: ID!
  ): Amenity

  updateAmenity(
    _id: ID!
    amenityName: String!
    amenityDescription: String
    amenityType: String
  ): Amenity
}
`;

module.exports = typeDefs;
