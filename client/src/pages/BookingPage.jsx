// Component for displaying User signup form
// import required dependencies
import React, { useState } from 'react';
import moment from 'moment';
import { Link, useParams, useLocation } from 'react-router-dom';


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

  const { state } = useLocation();
  console.log('state', state)
  console.log('checkin:', state.checkin)
  console.log('checkout:', state.checkout)
  console.log('numA', state.numAdults)
  console.log('numC', state.numChildren)
  console.log('numDays', state.numDays)

  //  call ADD_BOOKING mutation
  const [addBooking, { error, bookdata }] = useMutation(ADD_BOOKING);

  let checkinDate = moment(state.checkin).format('DD-MM-YYYY')
  let checkoutDate = moment(state.checkout).format('DD-MM-YYYY')
  let numbAdults = Number(state.numAdults)
  let numbChildren = Number(state.numChildren)
  let numbDays = Number(state.numDays)

  // set initial form state

  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottages = data?.viewCottages || [];
  const [cottage, setCottage] = useState(cottages)
  const [amount, setAmount] = useState(0)


  async function roomSelect(cottId, cottNumber, cottrate) {
    console.log(`this is the cottage selected ${cottId} with number ${cottNumber}`)
    setAmount(state.numDays * cottages.cottrate)

    // if logged in - get User details
    // if not logged in - Register/Login
    // const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    // if (!token) {
    //   return false;
    // }

    try {

      const { bookdata } = await addBooking({
        variables: {
          checkin: checkinDate,
          checkout: checkoutDate,
          numAdults: numbAdults,
          numChildren: numbChildren,
          // guest: 'HardCodedForNow',
          // cottage: cottId,
          amount: amount
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
      <div className="w-full max-w-md box-border h-64 p-4 border-4">
        <h2>Booking Details</h2>
        {/* {state && ( */}
        (
        <div>
          <p>state from : {state.from}</p>
          <p>state from : {state.checkin}</p>
          <p>checkin Date: {checkinDate}</p>
          <p>Checkout Date: {checkoutDate}</p>
          <p>Number of Adults: {state.numAdults}</p>
          <p>Number of Children: {state.numChildren}</p>
          <p>Amount: {amount}</p>
          <hr></hr>
        </div>
        )

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
              baseRate={cottage.baseRate}
            />
            <button className="ml-10 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { roomSelect(cottage._id, cottage.cottageNumber, cottage.baseRate) }}>
              Select Cottage</button>
          </div>
        )
      })}
    </>
  );
};

export default BookingPage;
