import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_BOOKINGS } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


const { TabPane } = Tabs;

// TODO Allow admin to update any and all details.  Standard is to confirm/cancel


export default function AdminBookings() {

  const { loading, error, data } = useQuery(QUERY_BOOKINGS);
  let bookingData = data?.viewBookings || {};

  const [bookings, setBookings] = useState(bookingData);

  // setBookings(bookingData);

  return (
    <>
      <h1>Admin Bookings Table</h1>
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
      </div>
    </>
  )
};

