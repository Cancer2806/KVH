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
  mutation addBooking($checkin: String!, $checkout: String!, $numAdults: Int, $numChildren: Int, $amount: Float ) {
    addBooking(checkin: $checkin, checkout: $checkout, numAdults: $numAdults, numChildren: $numChildren, amount: $amount) {
      numAdults
    }
  }
`