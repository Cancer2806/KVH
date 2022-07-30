import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


const { TabPane } = Tabs;

// TODO Allow admin to update any and all details.  Standard is to change description / rates / images


export default function AdminCottages() {

  const { loading, error, data } = useQuery(QUERY_ALL_COTTAGES);
  let cottageData = data?.viewCottages || {};

  const [cottages, setCottages] = useState(cottageData);

  // setCottages(cottageData);

  return (
    <>
      <h1>Cottage Details</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        
        <table className="ml-5">
          <thead className="mt-5">
            <tr className="ml-5">
              <th className="ml-5">Number</th>
              <th className="ml-5">Name</th>
              <th className="ml-5">Rooms</th>
              <th className="ml-5">Maximum Guests</th>
              <th className="ml-5">Base Rate</th>
              <th className="ml-5">Description</th>

            </tr>
          </thead>
          <tbody>
            {cottageData.length && (cottageData.map(cottage => {
              return <tr className="ml-5">
                <td className="ml-5">{cottage.cottageNumber}</td>
                <td className="ml-5">{cottage.cottageName}</td>
                <td className="ml-10">{cottage.numRooms}</td>
                <td className="ml-5">{cottage.maxGuests}</td>
                <td className="ml-5">{cottage.baseRate}</td>
                <td className="ml-5">{cottage.cottageDescription}</td>
              </tr>
            }))}
          </tbody>
        </table>
        <hr></hr>
        {cottageData.length && (<h1>There are a total of {cottageData.length} cottages</h1>)}
      </div>
    </>
  )
};

