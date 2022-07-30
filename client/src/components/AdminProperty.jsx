import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_PROPERTY } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';



// TODO Allow admin to update any and all details.  Standard is to change to Admin status
// TODO show bookings as subset of each User or proived a button and select to see bookings


export default function AdminProperty() {
  const { loading, error, data } = useQuery(QUERY_PROPERTY);
  let propertyData = data?.viewProperty || [];

  const [property, setProperty] = useState(propertyData);

  return (
    <>
      <h1 className="text-center text-xl">Property Details</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        {propertyData.length && (propertyData.map(property => {
          return (
            <>
              <h1>Property Name: &nbsp; {property.propertyName}</h1>
              <hr></hr>
              <h3>Description: &nbsp; <strong>{property.propertyDescription}</strong></h3>
              <h4>ABN: &nbsp; <strong>{property.ABN}</strong></h4>
              <h4>ACN: &nbsp; <strong>{property.ACN}</strong></h4>
              <h4>Logo: &nbsp; <strong>{property.Logo}</strong></h4>
              <h4>Email: &nbsp; <strong>{property.propertyEmail}</strong></h4>
              <h4>Website: &nbsp; <strong>{property.webAddress}</strong></h4>
              <h4>Street Address: &nbsp; <strong>{property.streetAddress}</strong></h4>
              <h4>Postal Address:&nbsp; <strong>{property.postalAddress}</strong></h4>
              <h4>Contact Person: &nbsp; <strong>{property.contact}</strong></h4>
              <hr></hr>
              {property.images.length && (property.images.map(image => {
                return (
                  <div>
                    <img className="rounded-lg" src={`${process.env.PUBLIC_URL}${image}`} alt="Not viewable" />

                    <p>Image location: {image}</p>
                  </div>
                )
              }))}
              <hr></hr>
            </>
          )
        }))}
        <hr></hr>
      </div>
    </>
  )
};