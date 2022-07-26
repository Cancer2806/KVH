// Component for displaying User signup form
// import required dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// TODO change to Tailwind
// import { Form, Button, Alert } from 'react-bootstrap';

// import mutations
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import AuthService from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className="container my-1">
        <Link to="/login">← Go to Login</Link>

        <h2>Signup</h2>

        <form onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert> */}
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type='text'
              placeholder="Your first name"
              name="firstName"
              type="text"
              id="firstName"
              onChange={handleInputChange}
              value={userFormData.firstName}
              required
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type='text'
              placeholder='Your last name'
              name='lastName'
              id="lastName"
              onChange={handleInputChange}
              value={userFormData.lastName}
              required
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              type='email'
              placeholder='Your email address'
              name='email'
              id="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              type='password'
              placeholder='Your password'
              name='password'
              id="pwd"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
