import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

// TODO import components for tabs
const { TabPane } = Tabs;

export default function AdminPage() {
  let navigate = useNavigate();

  const { loading, error, data } = useQuery(QUERY_ME);
  let userData = data?.me || {};
 

  // prevent use by non-admin
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;

  if (!token) {
    if (!token) {
      navigate('/login');
    }
  }
  
  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3 mt-3 mr-3 bs">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Bookings" key="1">
          <h1>Table of all Bookings to go here</h1>
          {/* <AdminBooking></AdminBooking> */}
        </TabPane>
        <TabPane tab="Cottages" key="2">
          <h1>Admin update cottages Component to go here</h1>
          {/* <AdminCottage></AdminCottage> */}
        </TabPane>
        <TabPane tab="Users" key="3">
          <h1>Table of all users to go here - allow adding new admin user</h1>
          {/* <AdminUser></AdminUser> */}
        </TabPane>
      </Tabs>
    </div>
  );
}