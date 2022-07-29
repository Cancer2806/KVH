// Define app entry point, context and authentication middleware
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

// import required components/pages
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';


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
            <h1 className="flex flex-row bg-green-500 border-2 border-red-500 justify-center">
              Cottages are great and Karri Valley is fabulous. &nbsp; Why not visit and stay with us?
            </h1>
          </div>
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
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
              // path='/booking/:checkin/:checkout/:numAdults/:numChildren/:numDays'
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
