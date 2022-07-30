
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
  // const numbers = cottages.map(({cottageNumber, cottageName, images, numRooms, cottageDescription, amenities, maxGuests, baseRate}) => {
  // // const newArr = [...cotageN]
  // })

  // const sorted = [...numbers].sort((a, b) => a - b)
  // console.log('sorted', sorted)
  
  return (
    <>
      {/* Property Details to go below Navbar before cottages */}
      <div>
        <ReservationForm />
      </div>
      {/* Cottage layout to be improved on mobile - 1 wide, on comp 3 wide */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {cottages.map((cottage, index) => {
        return (
          
          
            <Card key={cottage.cottageNumber}
              img={cottage.images[0]}
              number={cottage.cottageNumber}
              title={cottage.cottageName}
              rooms={cottage.numRooms}
              max={cottage.maxGuests}
              text={cottage.cottageDescription}
            />
          
        )
      })}
      </div>
    </>);
};

export default HomePage;