
import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import Card from '../components/base/Card';
import ReservationForm from '../components/base/ReservationForm';

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottages = data?.viewCottages || [];
  const [cottage, setCottage] = useState(cottages)
  // cottages.sort(cottages.cottageNumber);

  return (
    <>
      {/* Property Details to go below Navbar before cottages */}
      <div>
        <ReservationForm />
      </div>
      {/* Cottage layout to be improved on mobile - 1 wide, on comp 3 wide */}
      {cottages.map((cottage, index) => {
        return (
          <div className="container">
            <Card key={cottage.cottageNumber}
              img={cottage.images[0]}
              number={cottage.cottageNumber}
              title={cottage.cottageName}
              rooms={cottage.numRooms}
              max={cottage.maxGuests}
              text={cottage.cottageDescription}
            />
          </div>
        )
      })}
    </>);
};

export default HomePage;