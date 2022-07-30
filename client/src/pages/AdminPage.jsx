import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";
import { Tab } from '@headlessui/react'

import { useQuery, } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

import AdminBookings from "../components/AdminBookings";
import AdminCottages from "../components/AdminCottages";
import AdminUsers from "../components/AdminUsers";
import AdminProperty from "../components/AdminProperty";

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
      <h1 className="text-center text-4xl"><strong>Administrators Console</strong></h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <AdminBookings />
        </TabPane>
        <TabPane tab="Cottages" key="2">
          <AdminCottages />
        </TabPane>
        <TabPane tab="Users" key="3">
          <AdminUsers />
        </TabPane>
        <TabPane tab="Property" key="4">
          <AdminProperty />
        </TabPane>
      </Tabs>
    </div>
  );
}