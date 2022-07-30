import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


const { TabPane } = Tabs;

// TODO Allow admin to update any and all details.  Standard is to change to Admin status
// TODO show bookings as subset of each User or proived a button and select to see bookings


export default function AdminUsers() {
  const { loading, error, data } = useQuery(QUERY_USERS);
  let userData = data?.viewUsers || [];

  const [users, setUsers] = useState(userData);

  // console.log(`users '%o' ${userData}`)
  // setBookings(bookingData);

  return (
    <>
      <h1>Tables showing all Users</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        <table className="ml-5">
          <thead className="mt-5">
            <tr className="ml-5">
              <th className="ml-5">First Name</th>
              <th className="ml-5">Last Name</th>
              <th className="ml-5">Email</th>
              <th className="ml-5">Type of User</th>
            </tr>
          </thead>
          <tbody>
            {userData.length && (userData.map(user => {
              return <tr className="ml-5">
                <td className="ml-5">{user.firstName}</td>
                <td className="ml-5">{user.lastName}</td>
                <td className="ml-5">{user.userEmail}</td>
                <td className="ml-5">{user.userType}</td>
              </tr>
            }))}
          </tbody>
        </table>
        <hr></hr>
        {userData.length && (<h1>There are a total of {userData.length} users</h1>)}
      </div>
    </>
  )
};