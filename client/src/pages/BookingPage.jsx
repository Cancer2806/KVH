// Component for displaying User signup form
// import required dependencies
import React, { useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';


// import mutations
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import { ADD_BOOKING } from '../utils/mutations';
import Card from '../components/base/Card';
import ReservationForm from '../components/base/ReservationForm';

import AuthService from '../utils/auth';

// TODO TODO TODO
// Display only available cottages
// Allow guest to select cottage 
// Login or signup User to obtain guest details and complete booking
// amount to be calculated

const BookingPage = () => {
  const { checkin, checkout, numAdults, numChildren, numDays } = useParams();
  //  call ADD_BOOKING mutation
  const [addBooking, { error, bookdata }] = useMutation(ADD_BOOKING);

  let checkinDate = moment(checkin).format('DD-MM-YYYY')
  let checkoutDate = moment(checkout).format('DD-MM-YYYY')

  
  // set initial form state

  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottages = data?.viewCottages || [];
  const [cottage, setCottage] = useState(cottages)


  async function roomSelect(cottId, cottNumber) {
    console.log(`this is the cottage selected ${cottId} with number ${cottNumber}`)

    // if logged in - get User details
    // if not logged in - Register/Login
    // const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    // if (!token) {
    //   return false;
    // }
    try {
      console.log(`checkin passed: ${checkin}`)
      console.log(`checkout passed: ${checkout}`)
      console.log(`checkindate: ${checkinDate}`)
      console.log(`checkoutdate, ${checkoutDate}`)
      console.log(`numAdults ${numAdults}`)
     
      console.log(`numChildren is ${numChildren}`)
      console.log(`numDays is ${numDays}`)
      const { bookdata } = await addBooking({
        variables: {
          checkIn: checkinDate,
          checkOut: checkoutDate,
          numAdults: numAdults,
          numChildren: numChildren,
          // guest: 'HardCodedForNow',
          // cottage: cottId,
          amount: numDays
        },
      });

    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }
  }



  return (
    <>
      <div>
        <ReservationForm />
      </div>
      <div>
        <h2>Booking Details</h2>
        <p>Checkin Date: {checkinDate}</p>
        <p>Checkout Date: {checkoutDate}</p>
        <p>Number of Adults: {numAdults}</p>
        <p>Number of Children: {numChildren}</p>
      </div>
      <h2>Available Cottages</h2>
      {cottages.map((cottage, index) => {
        return (
          <div className="container">
            <Card key={cottage.cottageNumber}
              img={cottage.images[0]}
              number={cottage.cottageNumber}
              title={cottage.cottageName}
              rooms={cottage.numRooms}
              max={cottage.maxGuests}
              text={cottage.cottageDescription}
            />
            <button className="ml-10 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { roomSelect(cottage._id, cottage.cottageNumber) }}>
              Select Cottage</button>
          </div>
        )
      })}
    </>
  );
};

export default BookingPage;
