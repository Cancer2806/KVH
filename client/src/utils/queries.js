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
    maxGuests
    baseRate
    bookings {
      _id
      checkin
      checkout
      numAdults
      numChildren
      numPets
      cottageName
      guestEmail
      amount
    }
    amenities {
      amenityName
      amenityDescription
      amenityType
    }
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
    bookings {
      checkin
      checkout
      _id
      numAdults
      numChildren
      guestEmail
      cottageName
      amount
    }
  }
}
  `

export const QUERY_BOOKINGS = gql`
  query viewBookings {
    viewBookings {
    _id
    checkin
    checkout
    numAdults
    numChildren
    numPets
    guestEmail
    cottageName
    dateConfirmed
    status
    amount
    }
  }
  `

export const QUERY_USERS = gql`
  query viewUsers {
    viewUsers {
    _id
    firstName
    lastName
    userEmail
    userType
    bookings {
      cottageName
      checkin
      checkout
      amount
      numAdults
      numChildren
      numPets
      guestEmail
      status
      dateConfirmed
    }
  }
}
  `

export const QUERY_AMENITIES = gql`
  query viewAmenities {
    viewAmenities {
    _id
    amenityName
    amenityDescription
    amenityType
    }
  }
  `