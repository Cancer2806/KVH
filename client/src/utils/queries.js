import { gql } from '@apollo/client';

export const QUERY_ALL_COTTAGES = gql`
  query viewCottages {
    cottages {_id
    cottageName
    numRooms
    cottageDescription
    amenities {
      amenityName
      amenityDescription
    }
    maxGuests
    cottageNumber
  }
}
`;
