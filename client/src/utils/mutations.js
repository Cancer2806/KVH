// Define frontend mutations to match backend mutation resolvers
import { gql } from '@apollo/client';

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
        _id
        firstName
        lastName
    }
  }
}
`;


// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
  }
}
`

// ADD_BOOKING will enter a cottage booking request
export const ADD_BOOKING = gql`
  mutation addBooking($checkIn: String, $checkOut: String, $numAdults: Int, $numChildren: Int, $amount: Float ) {
    addBooking(checkIn: $checkIn, checkOut: $checkOut, numAdults: $numAdults, numChildren: $numChildren, amount: $amount ) {
      numAdults
    }
  }
`