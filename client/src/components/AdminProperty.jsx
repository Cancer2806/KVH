import React, { useState, useEffect } from "react";

import { useQuery, } from '@apollo/client';
import { QUERY_PROPERTY } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


// TODO Allow admin to update any and all details.  Standard is to change description / rates / images


export default function AdminProperty() {

  const { loading, error, data } = useQuery(QUERY_PROPERTY);
  let propertyData = data?.viewProperty || {};

  const [property, setProperty] = useState(propertyData);

  console.log(`property: '%o' ${propertyData}`)

  return (
    <>
      <div>
        {loading && (<Loader />)}
        {error && (<Error />)}
        <h1>Property Name:  &nbsp; <strong>{propertyData[0].propertyName}</strong></h1>
        <hr></hr>

        <h3>Description: &nbsp; <strong>{propertyData[0].propertyDescription}</strong></h3>
        <h4>ABN: &nbsp; <strong>{propertyData[0].ABN}</strong></h4>
        <h4>ACN: &nbsp; <strong>{propertyData[0].ACN}</strong></h4>
        <h4>Logo: &nbsp; <strong>{propertyData[0].Logo}</strong></h4>
        <h4>Email: &nbsp; <strong>{propertyData[0].propertyEmail}</strong></h4>
        <h4>Website: &nbsp; <strong>{propertyData[0].webAddress}</strong></h4>
        <h4>Street Address: &nbsp; <strong>{propertyData[0].streetAddress}</strong></h4>
        <h4>Postal Address:&nbsp; <strong>{propertyData[0].postalAddress}</strong></h4>
        <h4>Contact Person: &nbsp; <strong>{propertyData[0].contact}</strong></h4>
        <hr></hr>

        {propertyData[0].images.length && (propertyData[0].images.map(image => {
          return (
          <p>Image location: {image}</p>
          )
        }))}
        
        <hr></hr>
      </div>
    </>
  )
};

