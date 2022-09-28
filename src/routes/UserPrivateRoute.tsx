/*eslint-disable */
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

const UserPrivateRoute = () => {
  // const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const checkdata = localStorage.getItem("userid");

  return checkdata ? <Outlet /> : <Navigate to="/login" />;


  // return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default UserPrivateRoute;
