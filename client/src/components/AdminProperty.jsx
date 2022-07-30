import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_PROPERTY } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


// TODO Allow admin to update any and all details

export default function AdminProperty() {
  const { loading, error, data } = useQuery(QUERY_PROPERTY);
  let propertyData = data?.viewProperty || [];

  const [property, setProperty] = useState(propertyData);

  return (
    <>
      <h1 className="text-center text-2xl">Property Details</h1>
      <hr></hr>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        {propertyData.length && (propertyData.map(property => {
          return (
            <>
              <h2 className="text-xl pl-5 pr-5 mr-10">Property Name: &nbsp; <strong>{property.propertyName}</strong></h2>
              <hr></hr>
              <h3 className="pl-5 pr-5 mr-10">Description: &nbsp; <strong>{property.propertyDescription}</strong></h3>
              <h4 className="pl-5 pr-5 mr-10">ABN: &nbsp; <strong>{property.ABN}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">ACN: &nbsp; <strong>{property.ACN}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">Logo: &nbsp; <strong>{property.Logo}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">Email: &nbsp; <strong>{property.propertyEmail}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">Website: &nbsp; <strong>{property.webAddress}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">Street Address: &nbsp; <strong>{property.streetAddress}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">Postal Address:&nbsp; <strong>{property.postalAddress}</strong></h4>
              <h4 className="pl-5 pr-5 mr-10">Contact Person: &nbsp; <strong>{property.contact}</strong></h4>
              <hr></hr>
              {property.images.length && (property.images.map(image => {
                return (
                  <div>
                    <img className="rounded-lg w-160 md:w-320 lg:w-480" src={`${process.env.PUBLIC_URL}${image}`} alt="Not viewable" />

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