// Component for displaying User signup form
// import required dependencies
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';


// import mutations
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import { ADD_BOOKING } from '../utils/mutations';
import Card from '../components/base/Card';
import ReservationForm from '../components/base/ReservationForm';

import AuthService from '../utils/auth';

// TODO TODO TODO
// Display only available cottages - issue with logic if cottage has multiple bookings
// Allow guest to select cottage 
// Login or signup User to obtain guest details and complete booking
// amount to be calculated

const BookingPage = () => {

  const { state } = useLocation();
  let navigate = useNavigate();
  
  // console.log('state', state)

  //  call ADD_BOOKING mutation
  const [addBooking, { error, bookingdata }] = useMutation(ADD_BOOKING);
  let run = true;
  
  console.log(`checkinDate: ${state.checkin}, ${state.checkout}`)
  
  let numAdults = Number(state.numAdults)
  let numChildren = Number(state.numChildren)
  let numDays = Number(state.numDays)
  const requestin = moment(state.checkin, "DD-MM-YYYY")
  const requestout = moment(state.checkout, "DD-MM-YYYY")

  // set initial form state

  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottageData = data?.viewCottages || [];
  
  const [cottages, setCottages] = useState(cottageData)
  const [duplicateCottages, setDuplicateCottages] = useState(cottageData)
  const [amount, setAmount] = useState(0)


  // Issue with this as it either renders in an endless loop, or only runs once - need to re-run if Reservation Form changes
  // Issus with this in that a cottage with two bookings can give a false availability
  // It may be better to filter out a cottage as soon as found to be unavailable
  
  useEffect(() => {
    let tempCottages = [];

    for (const duplicateCottage of duplicateCottages) {
      let availability = false;
      if (duplicateCottage.bookings.length > 0) {
        for (const booking of duplicateCottage.bookings) {

          availability=false

          const bookin = moment(booking.checkin, "DD-MM-YYYY")
          const bookout = moment(booking.checkout, "DD-MM-YYYY")
          const rin = requestin.isBetween(bookin, bookout)
          const rout = requestout.isBetween(bookin, bookout)

          console.log(`Booking ${duplicateCottage.cottageName}, ${booking.checkin} ${booking.checkout}`)

          console.log(`Pepper2 ${duplicateCottage.cottageName}, ${rin} ${rout}`)


          if (!rin && !rout && requestin !== bookin && !(requestin<bookin && requestout>bookout) && requestout !==bookout ) {
            availability = true;
          }
        } 
      }
      if (availability === true || duplicateCottage.bookings.length === 0) {
        tempCottages.push(duplicateCottage);
        // console.log(`tempCottages`, '%o', tempCottages)
      }
    }

    setCottages(tempCottages)
  }, []);

  async function cottageSelect(cottId, cottName, cottrate) {
    setAmount(numDays * cottrate)

    // if logged in - get User details
    // if not logged in - Register/Login
    // need to be able to login without losing booking data

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    
    if (!token) {
      navigate('/login' );
    }
    
    try {

      const { bookdata } = await addBooking({
        variables: {
          checkin: state.checkin,
          checkout: state.checkout,
          numAdults: numAdults,
          numChildren: numChildren,
          // guestEmail: 'fred@flintstone.com',
          cottageName: cottName,
          amount: numDays*cottrate
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
                
        <div>
          <p>checkin Date: {state.checkin}</p>
          <p>Checkout Date: {state.checkout}</p>
          <p>Number of Adults: {numAdults}</p>
          <p>Number of Children: {numChildren}</p>
          <p>Amount: {amount}</p>
          <hr></hr>
        </div>
        

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
            <button className="ml-10 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { cottageSelect(cottage._id, cottage.cottageName, cottage.baseRate) }}>
              Select Cottage</button>
          </div>
        )
      })}
    </>
  );
};

export default BookingPage;
