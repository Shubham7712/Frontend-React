/*eslint-disable */
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

const UserPublicRoute = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const isAuthenticated = isLoggedIn || localStorage.getItem('token');

  return isAuthenticated ? <Navigate to="/myAccount" /> : <Outlet />;
};

export default UserPublicRoute;
