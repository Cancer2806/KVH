// define component for the reservation form
// displays on most pages - goes to page showing available cottages for selection


// import the required dependencies
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';


// define and set state for User login form
export default function AmenityForm (id, name, type, description) {

  const [formData, setFormData] = useState({ name: name, type: type, description: description });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let navigate = useNavigate();

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
      

      // addAmenity
      // updateAmenity

     
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // reset the form
    // setFormData({
    //   numAdults: 0,
    //   numChildren: 0,
    // });
  };

  return (
    <>
      <div className="w-full max-w-sm">
        <form className="bg-emerald-800 text-white shadow-md rounded-xl px-8 pt-6 pb-8 ml-5 mb-4 max-w-lg" onSubmit={handleFormSubmit}>
          <h2 className="text-white text-center text-xl">Add/Update an Amenity</h2>
          {/* <Link to="/booking" state={{ checkin }}>
          Go to About Page (Link #1)
        </Link> */}
          

          {/* TODO consider validation and alerts if something is wrong */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-white">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='name'>Name</label>
              <input
                className="appearance-none w-1/2 block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder=""
                name="name"
                type="text"
                id="name"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
              {/* </div> */}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='description'>Description</label>
              <input
                className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder=""
                name="description"
                type="text"
                id="description"
                onChange={handleInputChange}
                value={formData.description}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='type'>Type</label>
              <input
                className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder=""
                name="type"
                type="text"
                id="type"
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
            <button className=" b-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Add/Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

