// Define front end queries matching backend resolvers
import { gql } from '@apollo/client';

export const QUERY_ALL_COTTAGES = gql`
  query viewCottages {
    viewCottages {
      _id
      cottageNumber
      cottageName
      images
      numRooms
      cottageDescription
      amenities {
        amenityName
        amenityDescription
      }
      maxGuests
      baseRate 
  }
}
`;

export const QUERY_PROPERTY = gql`
  query viewProperty {
    viewProperty {
      _id
      propertyName
      propertyLogo
      propertyDescription
      streetAddress
      postalAddress
      phoneNumber
      mobileNumber
      ABN
      ACN
      propertyEmail
      webAddress
      contact
      images
    }
  }
  `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      userEmail
      userType
    }
  }
  `