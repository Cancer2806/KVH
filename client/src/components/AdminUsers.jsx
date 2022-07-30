import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


const { TabPane } = Tabs;

// TODO Allow admin to update any and all details.  Standard is to change to Admin status
// TODO show bookings as subset of each User or select to see bookings


export default function AdminUsers() {
  const { loading, error, data } = useQuery(QUERY_USERS);
  const userData = data?.viewUsers || [];

  const [users, setUsers] = useState(userData);

  // console.log(`users '%o' ${userData}`)

 
  return (
    <>
      <h1>Tables showing all Users</h1>
      <hr></hr>
      <div >
        {loading && (<Loader />)}
        {error && (<Error />)}
        <table className="ml-5">
          <thead className="mt-5">
            <tr className="ml-5">
              <th className="ml-5">Checkin</th>
              <th className="ml-5">Checkout</th>
              <th className="ml-5">Cottage</th>
              <th className="ml-5">Guest</th>
              <th className="ml-5">Adults</th>
              <th className="ml-5">Children</th>
              <th className="ml-5">Date Confirmed</th>
              <th className="ml-5">Status</th>
              <th className="ml-5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.length && (bookingData.map(booking => {
              return <tr className="ml-5">
                <td className="ml-5">{booking.checkin}</td>
                <td className="ml-5">{booking.checkout}</td>
                <td className="ml-10">{booking.cottageName}</td>
                <td className="ml-5">{booking.guestEmail}</td>
                <td className="ml-5">{booking.numAdults}</td>
                <td className="ml-5">{booking.numChildren}</td>
                <td className="ml-5">{booking.dateConfirmed}</td>
                <td className="ml-5">{booking.Status}</td>
                <td className="ml-5">{booking.amount}</td>
              </tr>
            }))}
          </tbody>
        </table>
        <hr></hr>
        {bookingData.length && (<h1>There are a total of {bookingData.length} bookings</h1>)}
        <div >

        </div>
      </div>
    </>
  )
};