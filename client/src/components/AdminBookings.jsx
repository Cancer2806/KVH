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

  // const [bookings, setBookings] = useState(bookingData);

  // setBookings(bookingData);

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
              <th className="text-center">Checkin &nbsp; </th>
              <th className="text-center">Checkout &nbsp; </th>
              <th className="pl-2">Cottage &nbsp; </th>
              <th className="text-left">Guest &nbsp; </th>
              <th className="pl-2">Adults &nbsp; </th>
              <th className="pl-2">Children &nbsp; </th>
              <th className="text-center">Date Confirmed &nbsp; </th>
              <th className="pl-2">Status &nbsp; </th>
              <th className="text-center">Amount &nbsp; </th>
            </tr>
          </thead>
          <tbody>
            {bookingData.length && (bookingData.map(booking => {
              return <tr>
                <td className="text-center">{booking.checkin} &nbsp; </td>
                <td className="text-center">{booking.checkout} &nbsp; </td>
                <td className="text-left pl-2">{booking.cottageName} &nbsp; </td>
                <td className="text-left">{booking.guestEmail} &nbsp;  &nbsp; </td>
                <td className="text-center">{booking.numAdults} &nbsp; </td>
                <td className="text-center">{booking.numChildren} &nbsp; </td>
                <td className="text-center">{booking.dateConfirmed} &nbsp; </td>
                <td className="text-center">{booking.Status} &nbsp; </td>
                <td className="text-right">{booking.amount} &nbsp; </td>
              </tr>
            }))}
          </tbody>
        </table>
        <hr></hr>
        {bookingData.length && (<h2 className="text-center text-xl">There are a total of {bookingData.length} bookings</h2>)}
      </div>
    </>
  )
};

