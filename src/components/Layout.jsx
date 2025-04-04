import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 