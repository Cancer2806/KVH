// This page to be used as Landing page and parent of all components that don't need logon to access
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_ALL_COTTAGES, QUERY_PROPERTY } from '../utils/queries';

import Card from '../components/base/Card';
import ReservationForm from '../components/base/ReservationForm';

import Loader from '../components/base/Loader';
import Error from '../components/base/Error';
import Success from '../components/base/Success'

export default function HomePage() {

  const { loading: load1, error: error1, data: data1 } = useQuery(QUERY_PROPERTY);
  const { loading, error, data } = useQuery(QUERY_ALL_COTTAGES);

  const [cottages, setCottages] = useState([]);
  const [property, setProperty] = useState([]);

  useEffect(() => {
    setCottages(data?.viewCottages || [])
  }, [data]);

  useEffect(() => {
    setProperty(data1?.viewProperty || [])
  }, [data1]);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:block pr-2 min-w-fit" >
          <ReservationForm />
        </div>
        {loading && (<Loader />)}
        {(error) && (<Error />)}

        <div className="w-full max-w-5xl box-border h-84 p-2 border-4">
          <div>
            {property.length ? (property.map(property => {
              return (
                <div key={property._id}>
                  <h2 className="text-3xl pl-5 pr-5 mr-10 text-center"><strong>{property.propertyName}</strong></h2>
                  <p className="pl-5 pr-5 mr-10 text-xs text-center">ABN: &nbsp; <strong>{property.ABN}</strong></p>
                  <hr></hr>
                  <h3 className="pl-5 pr-1 mr-1 text-xs text-center"><strong>{property.propertyDescription}</strong></h3>
                  <hr></hr>
                  <h6 className="pl-5 pr-5 mr-10 text-xs text-center">Email: &nbsp; <strong>{property.propertyEmail}</strong></h6>
                  <h6 className="pl-5 pr-5 mr-10 text-xs text-center">Address: &nbsp; <strong>{property.streetAddress}</strong></h6>
                  <h4 className="pl-5 pr-5 mr-10 text-center"><strong>{property.contact} would love to see you here</strong></h4>
                  <hr></hr>
                  {property.images.length ?
                    < img className="rounded-lg w-160 md:w-320 lg:w-480" src={`${process.env.PUBLIC_URL}${property.images[0]}`} alt="Not viewable" /> : null}
                  <hr></hr>
                </div>
              )
            })) : null}
            <hr></hr>
          </div>
        </div>
      </div>
      <h2 className="text-center text-3xl mt-10">Our Cottages</h2>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-w-8xl">
        {cottages.map((cottage, index) => {
          return (
            <Card
              key={cottage._id}
              img={cottage.images[0]}
              number={cottage.cottageNumber}
              title={cottage.cottageName}
              text={cottage.cottageDescription}
            />
          )
        })}
      </div>
    </>);
};
