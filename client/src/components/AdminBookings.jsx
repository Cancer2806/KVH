import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_BOOKINGS } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


// TODO Allow admin to update any and all details.  Standard is to confirm/cancel


export default function AdminBookings() {

  const { loading, error, data } = useQuery(QUERY_BOOKINGS);
  
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(data?.viewBookings || [])
  }, [data]);


  return (
    <>
      <h1 className="text-center text-2xl mr-10">Bookings</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        <table className="table-auto">
          <thead className=" bg-green-500 text-lg">
            <tr>
              <th className="text-center">Checkin</th>
              <th className="text-center">Checkout</th>
              <th className="pl-2">Cottage</th>
              <th className="text-left pl-3">Guest</th>
              <th className="pl-2">Adults</th>
              <th className="pl-2">Children</th>
              <th className="text-center pl-2">Date Confirmed</th>
              <th className="pl-2">Status</th>
              <th className="text-center pl-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (bookings.map(booking => {
              return <tr key={booking._id}>
                <td className="text-center pl-2">{booking.checkin}</td>
                <td className="text-center pl-2">{booking.checkout}</td>
                <td className="text-left pl-3">{booking.cottageName}</td>
                <td className="text-left pl-3">{booking.guestEmail}</td>
                <td className="text-center">{booking.numAdults}</td>
                <td className="text-center">{booking.numChildren}</td>
                <td className="text-center">{booking.dateConfirmed}</td>
                <td className="text-center">{booking.Status}</td>
                <td className="text-right">{booking.amount}</td>
              </tr>
            })): null}
          </tbody>
        </table>
        <hr></hr>
        {bookings.length && (<h2 className="text-center text-xl">There are a total of {bookings.length} bookings</h2>)}
      </div>
    </>
  )
};

