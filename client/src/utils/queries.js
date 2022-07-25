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
  }
}
`;
