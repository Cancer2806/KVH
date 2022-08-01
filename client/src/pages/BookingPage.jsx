// Component for displaying User signup form
// import required dependencies
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';


// import mutations
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import { ADD_BOOKING } from '../utils/mutations';
import Card from '../components/base/Card';
import ReservationForm from '../components/base/ReservationForm';
import Loader from '../components/base/Loader';
import Error from '../components/base/Error';
import Success from '../components/base/Success'

import AuthService from '../utils/auth';

// TODO TODO TODO
// Display only available cottages - issue with logic if cottage has multiple bookings 
// Login or signup User to obtain guest details and complete booking: modal and without losing details

const BookingPage = () => {

  const { state } = useLocation();
  let navigate = useNavigate();

  //  call ADD_BOOKING mutation
  const [addBooking, { error: err, data: bookingdata }] = useMutation(ADD_BOOKING);

  let numAdults = Number(state.numAdults)
  let numChildren = Number(state.numChildren)
  let numDays = Number(state.numDays)
  const requestin = moment(state.checkin, "DD-MM-YYYY")
  const requestout = moment(state.checkout, "DD-MM-YYYY")

  // set initial form state

  const { loading, error, data } = useQuery(QUERY_ALL_COTTAGES);
  const [cottages, setCottages] = useState([])
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    setCottages(data?.viewCottages || [])
  }, [data]);

  // TODO Issue with this as it either renders in an endless loop, or only runs once - need to re-run if Reservation Form changes
  // /TODO Issue with this in that a cottage with two bookings can give a false availability
  // It may be better to filter out a cottage as soon as found to be unavailable

  useEffect(()=>{
    let tempCottages = [];

    for (const cottage of cottages) {
      let availability = false;
      if (cottage.bookings.length > 0) {
        for (const booking of cottage.bookings) {

          availability = false

          const bookin = moment(booking.checkin, "DD-MM-YYYY")
          const bookout = moment(booking.checkout, "DD-MM-YYYY")
          const rin = requestin.isBetween(bookin, bookout)
          const rout = requestout.isBetween(bookin, bookout)

          console.log(`Booking ${cottage.cottageName}, ${booking.checkin} ${booking.checkout}`)

          console.log(`Pepper2 ${cottage.cottageName}, ${rin} ${rout}`)
          if (!rin && !rout && requestin !== bookin && !(requestin < bookin && requestout > bookout) && requestout !== bookout) {
            availability = true;
          }
        }
      }
      if (availability === true || cottage.bookings.length === 0) {
        tempCottages.push(cottage);
        // console.log(`tempCottages`, '%o', tempCottages)
      }
    }

    // setCottages(tempCottages)
  },[])

  async function cottageSelect(cottId, cottName, cottrate) {
    setAmount(numDays * cottrate)

    // if logged in - continue with booking
    // TODO if not logged in - open Register/Login but without losing booking data 

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      navigate('/login');
    }

    try {

      const { bookdata } = await addBooking({
        variables: {
          checkin: state.checkin,
          checkout: state.checkout,
          numAdults: numAdults,
          numChildren: numChildren,
          cottageName: cottName,
          amount: numDays * cottrate
        },
      });
      return (<Success message="Request received - email on the way" />)
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:block pr-10" >
          <ReservationForm />
        </div>
        {loading && (<Loader />)}
        {(error) && (<Error />)}

        <div className="w-full max-w-md box-border h-64 p-4 border-4">

          <div>
            <h2 className='text-center text-2xl'>Booking Details</h2>
            <p>Checkin Date: <strong>{state.checkin}</strong></p>
            <p>Checkout Date: <strong>{state.checkout}</strong></p>
            <p>Number of Adults: <strong>{numAdults}</strong></p>
            <p>Number of Children: <strong>{numChildren}</strong></p>
            {amount > 0 ? (<p>Amount: <u><strong>${amount}.00</strong></u></p>) : (<p></p>)}
            <hr></hr>
          </div>
        </div>
      </div>
      <h2 className="text-center text-3xl">Available Cottages</h2>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {cottages.map((cottage, index) => {
          return (
            <div key={cottage._id}>
              <div>
                <Card
                  key={cottage._id}
                  img={cottage.images[0]}
                  number={cottage.cottageNumber}
                  title={cottage.cottageName}
                  text={cottage.cottageDescription}
                  baseRate={cottage.baseRate}
                />
              </div>
              <button className="ml-10 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-2 z-5" onClick={() => { cottageSelect(cottage._id, cottage.cottageName, cottage.baseRate) }}>
                Book Cottage</button>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default BookingPage;
