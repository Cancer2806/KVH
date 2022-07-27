// import apollo and define typeDefs for GraphQl
const { gql } = require('apollo-server-express');

// TODO develop typeDefs and Mutations as needed

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
    # bookings: [Booking]
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
    # numStays: Int
    # bookings: [Booking]
  }

  type Booking {
    _id: ID!
    checkIn: String!
    checkOut: String!
    numAdults: Int
    numChildren: Int
    numPets: Int
    # guest: User
    # cottage: Cottage
    amount: Float
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    viewCottages: [Cottage]
    viewAmenities: [Amenity]
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
    checkIn: String!
    checkOut: String!
    numAdults: Int
    numChildren: Int
    # guest: User
    # cottage: Cottage
    amount: Float
  ): Booking
  
  updateCottage(
    cottageName: String!
    numRooms: Int!
    cottageDescription: String
    # amenities: Amenity
    maxGuests: Int!
    images: [String]
    # bookings: [Booking]
  ): Cottage
}
`;

module.exports = typeDefs;
