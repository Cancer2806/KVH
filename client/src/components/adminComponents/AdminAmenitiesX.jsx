// Component used to display table of amenities with edit/delete/add functionality
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { VIEW_AMENITIES } from '../../utils/queries';
import { REMOVE_AMENITY } from "../../utils/mutations";

import Button from '../base/Button'
import Loader from '../base/Loader';
import Error from '../base/Error';
// import Success from '../base/Success'
// import Backdrop from '../base/Backdrop'
import AmenityForm from './AmenityForm'


export default function AdminAmenities() {

  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  
  const { state } = useLocation();
  let navigate = useNavigate();

  const [removeAmenity, { error: err, data: amenity }] = useMutation(REMOVE_AMENITY);

  const { loading, error, data } = useQuery(VIEW_AMENITIES);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    setAmenities(data?.viewAmenities || [])
  }, [data, amenity]);

  // Function for handling update
  async function selectHandler(id, name, type, description) {
    if (id) {
      navigate('/updateAmenity', { state: { id: id, name: name, type: type, description: description } })
    }
    // setUpdateForm(true)
  }

  // Function for handling poop
  async function deleteHandler(id) {
    try {
      const { data } = await removeAmenity({
        variables: {
          amenityId: id
        },
      }).then(
        // <Success message="Item Deleted" />
        navigate('/admin')
      )
    } catch (error) {
      console.error(error)
    }
  }

  // Function to expose Add Type Form
  async function addHandler() {
    setAddForm(true);
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
                <td className="text-center pl-2"><button onClick={() => { selectHandler(amenity._id, amenity.amenityName, amenity.amenityType, amenity.amenityDescription) }}>📋</button></td>
                <td className="text-center pl-2"><button onClick={() => { deleteHandler(amenity._id) }}>💩</button></td>
              </tr>
            })) : null}
          </tbody>
        </table>
        <hr className="mb-5"></hr>
        <AmenityForm />
        {/* <div> */}
          {/* <Button text='Add Amenity' onClick={addHandler} /> */}
          {/* {addForm && <AmenityForm />} */}
          {/* {addForm && <Backdrop />} */}
        {/* </div> */}
      </div>
    </>
  )
};