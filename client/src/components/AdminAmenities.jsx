import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_AMENITIES } from '../utils/queries';
import { REMOVE_AMENITY } from "../utils/mutations";

import Button from './base/Button'
import Loader from './base/Loader';
import Error from './base/Error';
import Success from './base/Success'
import AmenityForm from './base/AmenityForm'


// TODO Allow admin to create a new Amenity
// TODO Allow admin to create a new Amenity Type
// TODO Allow admin to remove an Amenity type - check that also removed from any cottage that is using it


export default function AdminAmenities() {

  const [value, setvalue] = useState(0);

  const [removeAmenity, { err, amenity }] = useMutation(REMOVE_AMENITY);
  
  const { loading, error, data } = useQuery(QUERY_AMENITIES);
  let amenityData = data?.viewAmenities || [];

  

  async function amenitySelect(id, name, type, description) {
 
    console.log(`button returns: ${id}, ${name}, ${type}, ${description}`)
  }

  async function amenityDelete(id) {
    
    try {
      const { data } = await removeAmenity({
        variables: {
          amenityId: id
        },
      })
      setvalue(value + 1);
      return (<Success message="Item Deleted" />)
    } catch (error) {
      console.error(error)
    }
    
  }

  async function newAmenity() {

    console.log(`clicked on newAmenity button`)
    // return (<AmenityForm />)
  }

  return (
    <>
      <h1 className="text-left text-2xl ml-10">List of available Amenities</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}

        <table className="table-auto">
          <thead className=" bg-green-500 text-xl">
            <tr>
              <th className="text-left pl-2">Amenity Name</th>
              <th className="text-left pl-2">Type</th>
              <th className="text-left pl-5">Description</th>
              <th className="text-center pl-2">Edit</th>
              <th className="text-center pl-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {amenityData.length && (amenityData.map(amenity => {
              return <tr className="ml-5">
                <td className="pl-2">{amenity.amenityName}</td>
                <td className="pl-2">{amenity.amenityType}</td>
                <td className="pl-5">{amenity.amenityDescription}</td>
                <td className="text-center pl-2"><button onClick={() => { amenitySelect(amenity._id, amenity.amenityName, amenity.amenityType, amenity.amenityDescription) }}>📋</button></td>
                <td className="text-center pl-2"><button onClick={() => { amenityDelete(amenity._id) }}>💩</button></td>
              </tr>
            }))}
          </tbody>
        </table>
        <hr></hr>
        <div>
          <Button onClick={newAmenity()} text='Add Amenity' />
        </div>
      </div>
    </>
  )
};