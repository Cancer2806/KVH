import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";

import { useQuery, } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

import AdminUsers from "../components/AdminUsers";
import AdminBookings from "../components/AdminBookings";

// TODO import components for tabs
const { TabPane } = Tabs;

export default function AdminPage() {
  let navigate = useNavigate();

  const { loading, error, data } = useQuery(QUERY_ME);
  let userData = data?.me || {};
 
  // prevent use by non-admin
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token || userData.userType !=='admin') {
      navigate('/login');
    }
  
  

  return (
    <div className="ml-3 mt-3 mr-3">
      <h1 className="text-center"><strong>Admin Page</strong></h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <h1>Here you can view all of your bookings</h1>
          <AdminBookings />
        </TabPane>
        <TabPane tab="Cottages" key="2">
          <h1>Admin update cottages Component to go here</h1>
          {/* <AdminCottage /> */}
        </TabPane>
        <TabPane tab="Users" key="3">
          <h1>Here you can view all of your users</h1>
          <AdminUsers />
        </TabPane>
      </Tabs>
    </div>
  );
}