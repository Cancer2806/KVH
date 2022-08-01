// define component for the reservation form
// displays on most pages - goes to page showing available cottages for selection


// import the required dependencies
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_AMENITY } from '../../utils/mutations';
import Success from './Success';



// define and set state for User login form
export default function AmenityForm(props) {
  
  const { state } = useLocation();
  let navigate = useNavigate();

  let amenityId = (state.id);
  let amenityName = (state.name);
  let amenityType = (state.type);
  let amenityDescription = (state.description);


  console.log(`state received: ${amenityId}, ${amenityName}, ${amenityType}, ${amenityDescription}`);

  const [formData, setFormData] = useState({ amenityId: amenityId, amenityName: amenityName, amenityType: amenityType, amenityDescription: amenityDescription });

  const [updateAmenity, {error}] = useMutation(UPDATE_AMENITY);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if valid data has been entered into the form
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await updateAmenity({
        variables: { ...formData },
      }).then(
        navigate('/admin')
      )
    } catch (err) {
      console.error(err);
      
    }
    // reset the form
  };

  return (
    <>
      <div className="w-full max-w-sm">
        <form className="bg-emerald-800 text-white shadow-md rounded-xl px-8 pt-6 pb-8 ml-5 mb-4 max-w-lg" onSubmit={handleFormSubmit}>
          <h2 className="text-white text-center text-xl">Update an Amenity</h2>
          {/* <Link to="/booking" state={{ checkin }}>
          Go to About Page (Link #1)
        </Link> */}
          

          {/* TODO consider validation and alerts if something is wrong */}

          <div className="flex flex-col flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-white">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='name'>Name</label>
              <input
                className="appearance-none w-full block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder=""
                name="amenityName"
                type="text"
                id="amenityName"
                defaultValue={amenityName}
                onChange={handleInputChange}
                value={formData.name}
                required
              />
            </div>
            <div className="w-full h-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='description'>Description</label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder=""
                name="amenityDescription"
                type="text"
                id="amenityDescription"
                defaultValue={amenityDescription}
                rows="2"
                onChange={handleInputChange}
                value={formData.description}
              ></textarea>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='type'>Type</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder=""
                name="amenityType"
                type="text"
                id="amenityType"
                defaultValue={amenityType}
                onChange={handleInputChange}
                value={formData.type}
              />
            </div>
          </div>
          {/* {error ? (
            <div>
              <p className="error-text">Please check the details entered</p>
            </div>
          ) : null} */}
          <div className="flex-row ">
            {/* Button to open Bookings Screen */}
            <button className=" b-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

