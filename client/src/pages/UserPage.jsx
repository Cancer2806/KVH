// This page only accessable to logged in User
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

import { Tabs, Tag } from "antd";

import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

// TODO import components for tabs
const { TabPane } = Tabs;

export default function UserPage() {
  let navigate = useNavigate();

  const { loading, error, data } = useQuery(QUERY_ME);
  let userData = data?.me || {};

  // ensure use only by logged in user
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      navigate('/login');
    }
  
  
  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="row">
            <div className="col-xs-12 ml-5 mb-5">
              <div className="bs">
                <p>Guest Profile</p>
                <p>First Name : {userData.firstName}</p>
                <p>Last Name : {userData.lastName}</p>
                <p>Email : {userData.userEmail}</p>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <h1>Table of Users Bookings to go here</h1>
          {/* <UserBookings></UserBookings> */}
        </TabPane>
      </Tabs>
    </div>
  );
}