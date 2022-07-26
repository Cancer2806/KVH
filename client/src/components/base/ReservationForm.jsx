// define component for the reservation form
// displays on most pages - goes to page showing available cottages for selection


// import the required dependencies
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


// Required syntax for antD Datepicker
const { RangePicker } = DatePicker;

// define and set state for User login form
const ReservationForm = () => {

  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [reservationData, setReservationData] = useState({ numAdults: 0, numChildren: 0 });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let navigate = useNavigate();

  function filterByDate(dates) {
    setCheckin(moment(dates[0]))
    setCheckout(moment(dates[1]))
  }
  // console.log('checkin', checkin._d, checkout._d)
  let checkinStr = moment(checkin).format('DD-MM-YYYY')
  let checkoutStr = moment(checkout).format('DD-MM-YYYY')

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if valid data has been entered into the form
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const numDays = moment.duration(checkout.diff(checkin)).asDays();

      if (checkin && checkout && reservationData.numAdults > 0) {
        navigate('/booking', { state: { checkin: checkinStr, checkout: checkoutStr, numAdults: reservationData.numAdults, numChildren: reservationData.numChildren, numDays: numDays } })
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // reset the form
    // setReservationData({
    //   numAdults: 0,
    //   numChildren: 0,
    // });
  };

  return (
    <>
      <div className="w-full max-w-sm">
        <form className="bg-emerald-800 text-white shadow-md rounded-xl px-8 pt-6 pb-8 ml-5 mb-4 max-w-lg" onSubmit={handleFormSubmit}>
          <h2 className="text-white text-center text-xl">Make a Reservation</h2>
          {/* <Link to="/booking" state={{ checkin }}>
          Go to About Page (Link #1)
        </Link> */}
          <div className="row-auto text-white">
            <div className=" text-center col-span-3 mt-5 mb-5">
              <hr className="text-black"></hr>
              <h2 className="text-white">Select your Checkin and Checkout days</h2>
              <RangePicker disabledDate={(current) => current.isBefore(moment().subtract(1, "day"))} format='ddd, DD-MMM-YYYY' onChange={filterByDate} />

              <hr className="text-black"></hr>
            </div>
          </div>

          {/* TODO consider validation and alerts if something is wrong */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-white">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='numAdults'>Adults</label>
              <input
                className="appearance-none w-1/2 block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="2"
                name="numAdults"
                type="number"
                id="adults"
                min="1"
                max="4"
                onChange={handleInputChange}
                value={reservationData.numAdults}
                required
              />
              {/* </div> */}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='numChildren'>Children</label>
              <input
                className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="0"
                name="numChildren"
                type="number"
                id="children"
                min="0"
                max="4"
                onChange={handleInputChange}
                value={reservationData.numChildren}

              />
            </div>
          </div>
          {/* {error ? (
            <div>
              <p className="error-text">Please check the details entered</p>
            </div>
          ) : null} */}
          <div className="flex-row ">
            {/* Button to open Bookings Screen */}
            <button className=" b-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Check Availability</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationForm;
