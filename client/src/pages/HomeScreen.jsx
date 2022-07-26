
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_COTTAGES } from '../utils/queries';
import Card from '../components/base/Card'
import { CheckCircleIcon } from '@heroicons/react/solid';

const { RangePicker } = DatePicker;

const HomeScreen = () => {

  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();

  const { loading, data } = useQuery(QUERY_ALL_COTTAGES);
  const cottages = data?.viewCottages || [];
  const [cottage, setCottage] = useState(cottages)
  // cottages.sort(cottages.cottageNumber);

  if (checkin) {
    console.log(`checkin ${checkin}`)
    console.log(`checkout ${checkout}`)
    const totaldays = moment.duration(checkout.diff(checkin)).asDays();
    console.log(`total days ${totaldays}`);
  }


  // function filterByDate(dates) {
  //   console.log(moment(dates[0]).format('DD-MMM-YYYY'));
  //   console.log(moment(dates[1]).format('DD-MMM-YYYY'));
  //   console.log('checkin', setCheckin(moment(dates[0],'DD-MMM-YYYY')));
  //   setCheckout(moment(dates[1],'DD-MMM-YYYY'));
  //   console.log(`check in ${checkin}`);
  //   console.log(`check out ${checkout}`);

  //   const totaldays = moment.duration(moment(dates[1], 'DD-MMM-YYYY').diff(moment(dates[0],'DD-MMM-YYYY'))).asDays();
  //   console.log(`total days ${totaldays}`);

  // }

  function filterByDate(dates) {
    // console.log(dates)
    setCheckin(moment(dates[0]))
    setCheckout(moment(dates[1]))
  }

  

  return (
    <>
      <div className="row-auto">
        <div className=" text-center col-span-3 mt-5 mb-5">
          <hr></hr>
          <RangePicker format='ddd, DD-MMM-YYYY' onChange={filterByDate} />
          <hr></hr>
        </div>
      </div>
      


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
          </div>
        )
      })}
    </>);
};

export default HomeScreen;