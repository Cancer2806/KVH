
import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import Card from '../components/base/Card'


const HomeScreen = () => {

  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottages = data?.viewCottages || [];
  const [cottage, setCottage] = useState(cottages)
  cottages.sort(cottageNumber)

  return (
    
    
    cottages.map((cottage, index) => {
      return (
        <div className="container">
          <Card
            img={cottage.images[0]}
            number={cottage.cottageNumber}
            title={cottage.cottageName}
            rooms={cottage.numRooms}
            max={cottage.maxGuests}
            text={cottage.cottageDescription}
          />
        </div>
      )
    })
  );
};

export default HomeScreen;