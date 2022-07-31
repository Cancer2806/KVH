import React, { useState, useEffect } from "react";
import { BackTop, Tabs, Tag } from "antd";

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_AMENITIES } from '../utils/queries';
import { REMOVE_AMENITY } from "../utils/mutations";

import Button from './base/Button'
import Loader from './base/Loader';
import Error from './base/Error';
import Success from './base/Success'
import Backdrop from './base/Backdrop'
import AmenityForm from './base/AmenityForm'


// TODO Allow admin to create a new Amenity
// TODO Allow admin to create a new Amenity Type
// TODO Allow admin to remove an Amenity type - check that also removed from any cottage that is using it


export default function AdminAmenities() {

  const [addForm, setAddForm] = useState(false);

  const [removeAmenity, { err, amenity }] = useMutation(REMOVE_AMENITY);
  
  const { loading, error, data } = useQuery(QUERY_AMENITIES);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    setAmenities ( data?.viewAmenities || [])
    console.log(`data is ${data}`);
  }, [data]);

  async function amenitySelect(id, name, type, description) {
 
    console.log(`button returns: ${id}, ${name}, ${type}, ${description}`)
  }

  async function deleteHandler(id) {
    
    try {
      const { data } = await removeAmenity({
        variables: {
          amenityId: id
        },
      })
      
      return (<Success message="Item Deleted" />)
    } catch (error) {
      console.error(error)
    }
    
  }

  async function addHandler() {

    setAddForm(true);
    console.log(`clicked on newAmenity button`)
    // return (<AmenityForm />)
  }

  return (
    <>
      <h1 className="text-left text-2xl ml-10">List of available Amenities</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {(error || err) && (<Error />)}
        
        <table className="table-auto mb-5">
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
            {amenities.length ? (amenities.map(amenity => {
              return <tr key={amenity._id} className="ml-5">
                <td className="pl-2">{amenity.amenityName}</td>
                <td className="pl-2">{amenity.amenityType}</td>
                <td className="pl-5">{amenity.amenityDescription}</td>
                <td className="text-center pl-2"><button onClick={() => { amenitySelect(amenity._id, amenity.amenityName, amenity.amenityType, amenity.amenityDescription) }}>📋</button></td>
                <td className="text-center pl-2"><button onClick={() => { deleteHandler(amenity._id) }}>💩</button></td>
              </tr>
            })): null}
          </tbody>
        </table>
        <hr className="mb-5"></hr>
        <div>
          <Button text='Add Amenity' onClick={addHandler} />
          {addForm && <AmenityForm />}
          {/* {addForm && <Backdrop />} */}
        </div>
      </div>
    </>
  )
};