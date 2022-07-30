import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { QUERY_PROPERTY } from '../utils/queries';

import Loader from './base/Loader';
import Error from './base/Error';


const { TabPane } = Tabs;

// TODO Allow admin to update any and all details.  Standard is to change description / rates / images


export default function AdminProperty() {

  const { loading, error, data } = useQuery(QUERY_PROPERTY);
  let propertyData = data?.viewProperty || {};

  const [property, setProperty] = useState(propertyData);


  return (
    <>
      <div >
        {loading && (<Loader />)}
        {error && (<Error />)}
        <h1>Property Name:  {propertyData[0].propertyName}</h1>
        <hr></hr>

        <h3>Description: {propertyData[0].propertyDescription}</h3>
        <h4>ABN: {propertyData[0].ABN}</h4>
        <h4>ACN: {propertyData[0].ACN}</h4>
        <h4>Logo: {propertyData[0].Logo}</h4>
        <h4>Email: {propertyData[0].propertyEmail}</h4>
        <h4>Website: {propertyData[0].webAddress}</h4>
        <h4>Street Address: {propertyData[0].streetAddress}</h4>
        <h4>Postal Address: {propertyData[0].postalAddress}</h4>
        <h4>Contact Person: {propertyData[0].contact}</h4>
        <hr></hr>

        {propertyData[0].images.length && (propertyData[0].images.map(image => {
          return (
          <p>Images address: {image}</p>
          )
        }))}
        
        <hr></hr>
      </div>
    </>
  )
};

