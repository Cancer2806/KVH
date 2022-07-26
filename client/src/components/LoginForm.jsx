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
      <div>
        <Link to="/signup">Go to Signup</Link>

        <h2>Login</h2>

      </div>
      
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='email'>Email Address:</label>
          <input
            placeholder='Your email'
            name='email'
            type='text'
            id='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
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
          <button type="submit">Submit</button>
        </div>
      </form>   
    </>
  );
};

export default LoginForm;
