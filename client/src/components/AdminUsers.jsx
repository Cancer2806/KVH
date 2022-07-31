import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


// TODO Allow admin to update user details.  Standard is to change to Admin status
// TODO show bookings as subset of each User or proived a button and select to see bookings

export default function AdminUsers() {
  
  const { loading, error, data } = useQuery(QUERY_USERS);

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    setUsers(data?.viewUsers || [])
  }, [data])


  return (
    <>
      <h1 className="text-left text-2xl ml-10">All Users</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}

        <table className="table-auto">
          <thead className=" bg-green-500 text-xl">
            <tr>
              <th className="text-left pl-2">First Name</th>
              <th className="text-left pl-2">Last Name</th>
              <th className="text-left pl-5">Email</th>
              <th className="text-center pl-2">Type of User</th>
            </tr>
          </thead>
          <tbody>
            {users.length && (users.map(user => {
              return <tr className="ml-5">
                <td className="pl-2">{user.firstName}</td>
                <td className="pl-2">{user.lastName}</td>
                <td className="pl-5">{user.userEmail}</td>
                <td className="text-center pl-2">{user.userType}</td>
              </tr>
            }))}
          </tbody>
        </table>
        <hr></hr>
        {users.length && (<h2 className="text-left pl-5 text-xl">There are a total of {users.length} users</h2>)}
      </div>
    </>
  )
};