// Define frontend mutations
import { gql } from '@apollo/client';

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($userEmail: String!, $password: String!) {
    login(userEmail: $userEmail, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        userEmail
      }
    }
  }
`;


// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $userEmail: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, userEmail: $userEmail, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        userEmail
      }
    }
  }
`


// ADD_BOOKING will enter a cottage booking request
export const ADD_BOOKING = gql`
  mutation addBooking($checkin: String!, $checkout: String!, $numAdults: Int, $numChildren: Int, $cottageName: String, $amount: Float ) {
    addBooking(checkin: $checkin, checkout: $checkout, numAdults: $numAdults, numChildren: $numChildren, cottageName: $cottageName, amount: $amount) {
      numAdults
      numChildren
      guestEmail
      cottageName
    }
  }
`

// ADD_AMENITY will enter a cottage booking request
export const ADD_AMENITY = gql`
  mutation addAmenity($amenityName: String!, $amenityDescription: String, $amenityType: String ) {
    addAmenity(amenityName: $amenityName, amenityDescription: $amenityDescription, amenityType: $amenityType) {
      amenityDescription
      amenityType
    }
  }
`

// ADD_AMENITY will enter a cottage booking request
export const UPDATE_AMENITY = gql`
  mutation updateAmenity($amenityId: ID!, $amenityName: String!, $amenityDescription: String, $amenityType: String ) {
    updateAmenity(_id: $amenityId, amenityName: $amenityName, amenityDescription: $amenityDescription, amenityType: $amenityType) {
      amenityDescription
      amenityType
    }
  }
`

// REMOVE_AMENITY will remove an Amenity
export const REMOVE_AMENITY = gql`
  mutation removeAmenity($amenityId: ID!) {
    removeAmenity(amenityId: $amenityId)
  {
    _id
  }
}
`