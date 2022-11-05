import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const ProtectedRouteForAuth = () => {
  const userState = useAppSelector((state) => state.user.user);
  let location = useLocation();

  React.useEffect(() => {}, [location.pathname]);

  return (location.pathname === '/login' ||
    location.pathname === '/register') &&
    userState ? (
    <Navigate to='/profile' />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRouteForAuth;
