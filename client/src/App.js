// Define app entry point, context and authentication middleware
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

// import required components/pages
import Navbar from './components/Navbar'

import HomePage from './pages/HomePage';
import CottagesPage from './pages/CottagesPage';
import AttractionsPage from './pages/AttractionsPage';
import LocationPage from './pages/LocationPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';

import BookingPage from './pages/BookingPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import UpdateAmenity from './components/adminComponents/UpdateAmenity';


// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set client to execute the authentication middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <div className="App">
            <h1 className="flex flex-row bg-green-600 border-2 border-red-500 justify-center">
              Cottages are great and Karri Valley is fabulous. &nbsp; Why not visit and stay with us?
            </h1>
          </div>
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/cottages'
              element={<CottagesPage />}
            />
            <Route
              path='/attractions'
              element={<AttractionsPage />}
            />
            <Route
              path='/location'
              element={<LocationPage />}
            />
            <Route
              path='/contact'
              element={<ContactPage />}
            />
            <Route
              path='/faq'
              element={<FaqPage />}
            />
            <Route
              path='/login'
              element={<LoginForm />}
            />
            <Route
              path='/signup'
              element={<SignupForm />}
            />
            {/* Route from Reservation component */}
            <Route
              path='/booking'
              element={<BookingPage />}
            />
            <Route
              path='/user'
              element={<UserPage />}
            />
            <Route
              path='/admin'
              element={<AdminPage />}
            />
            <Route
              path='/updateAmenity'
              element={<UpdateAmenity />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>No Matching Route!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider >
  );
}

export default App;
