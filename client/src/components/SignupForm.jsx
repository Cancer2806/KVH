// Component for displaying User signup form
// import required dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// TODO change to Tailwind

// import mutations
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import AuthService from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
  });

  // call ADD_USER mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has been correctly filled in
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      // Provide authentication token for newly created User
      AuthService.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset the form data when complete
    setUserFormData({
      firstName: '',
      lastName: '',
      userEmail: '',
      password: '',
    });
  };

  return (
    <>
      <div className="w-full max-w-md">
        <form className="w-full max-w-lg" onSubmit={handleFormSubmit}>
          <div className="">
            <h2 className="text-center text-lg" >Signup</h2>
            <br></br>
            <p className="text-center text-lg">
              <Link to="/login">← Go to Login</Link></p>
            <br></br>
          </div>

          {/* TODO consider validation and alerts if something is wrong */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">First Name:</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type='text'
                placeholder="Your first name"
                name="firstName"
                id="firstName"
                onChange={handleInputChange}
                value={userFormData.firstName}
                required
              />
              <p class="text-red-500 text-xs italic">Please fill in all fields.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">Last Name:</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type='text'
                placeholder='Your last name'
                name='lastName'
                id="lastName"
                onChange={handleInputChange}
                value={userFormData.lastName}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="userEmail">Email:</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type='email'
                placeholder='Your email address'
                name='userEmail'
                id="userEmail"
                onChange={handleInputChange}
                value={userFormData.userEmail}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pwd">Password:</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type='password'
                placeholder='Your password'
                name='password'
                id="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
            </div>
          </div>
          <div className="flex-row flex-end">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
