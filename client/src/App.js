// Define app entry point, context and authentication middleware
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import required components/pages
import './App.css';
import HomeScreen from './pages/HomeScreen';
import Dropdown from './components/base/Dropdown'
import Navbar from './components/Navbarmain'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
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
  // Set up our client to execute the authentication middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <div className="App">
      <h1 className="flex flex-row bg-red-500 border-2 border-green-500">
        Cottages are Great - Time to Stay In One
      </h1>
      <Navbar />
      <br></br>
      {/* <Dropdown /> */}

      
          </div>
          <Routes>
            <Route
              path='/'
              element={<HomeScreen />}
            />
            <Route
              path='/login'
              element={<LoginForm />}
            />
            <Route
              path='/signup'
              element={<SignupForm />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider >
  );
}

export default App;
