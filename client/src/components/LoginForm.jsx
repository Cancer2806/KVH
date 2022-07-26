// define component for the login form
// import the required dependencies
import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import and use mutations
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import AuthService from '../utils/auth';

// define and set state for User login form
const LoginForm = (props) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  // call the LOGIN_USER mutation
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
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
      const { data } = await login({
        variables: { ...userFormData },
      });

      // get token for current session once login complete
      AuthService.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // reset the login form
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleFormSubmit}>
          <div className="">
            <h2 className="text-center text-lg" >Login</h2>
            <br></br>
            <p className="text-center text-lg">
              <Link to="/signup">Go to Signup</Link></p>
            <br></br>
          </div>

          {/* TODO consider validation and alerts if something is wrong */}

          {/* <div className="flex flex-wrap -mx-3 mb-6"> */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='email'>Email Address:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder='Your email'
              name='email'
              type='text'
              id='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            {/* </div> */}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='password'>Password</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder='Your password'
              name='password'
              id='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
