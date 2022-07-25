
import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import Card from '../components/base/card'


const HomeScreen = () => {

  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottages = data?.viewCottages || [];
  console.log(cottages);

  const [cottage, setCottage] = useState(cottages)

  return (
    // map  func with data would have card component inside
    //  data.map
    cottages.map((cottage, index) => {
      return (
        <>
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
        </>
      )
    })
  );
};

export default HomeScreen;