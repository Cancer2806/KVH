import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


// TODO Allow admin to update any and all details.  Standard is to change description / rates / images


export default function AdminCottages() {

  const { loading, error, data } = useQuery(QUERY_ALL_COTTAGES);
  
  const [cottages, setCottages] = useState([]);

  useEffect(() => {
    setCottages(data?.viewCottages || [])
  }, [data])


  return (
    <>
      <h1 className="text-center text-2xl mr-10">Cottage Details</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        
        <table className="table-auto">
          <thead className=" bg-green-500 text-base">
            <tr>
              <th className="text-center">Number</th>
              <th className="text-left pl-2">Name</th>
              <th >Rooms</th>
              <th className="pl-2">Max Guests</th>
              <th className="pl-2">Base Rate</th>
              <th className="text-left pl-5">Description</th>
            </tr>
          </thead>
          <tbody>
            {cottages.length ? (cottages.map(cottage => {
              return <tr key={(cottage._id)}>
                <td className="text-center">{cottage.cottageNumber}</td>
                <td className="text-left pl-2">{cottage.cottageName}</td>
                <td className="text-center">{cottage.numRooms}</td>
                <td className="text-center">{cottage.maxGuests}</td>
                <td className="text-center">{cottage.baseRate}</td>
                <td className="pl-5
                ">{cottage.cottageDescription}</td>
              </tr>
            })): null}
          </tbody>
        </table>
        <hr></hr>
        {cottages.length && (<h2 className="text-center text-xl">There are a total of {cottages.length} cottages</h2>)}
      </div>
    </>
  )
};

