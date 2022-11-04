import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
// Components
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import Single from '../pages/Single/Single';
import Write from '../pages/Write/Write';
import ProtectedRoute from '../utils/ProtectedRoute';
import ProtectedRouteForAuth from '../utils/ProtectedRouteForAuth';

export const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:postId',
        element: <Single />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/write',
        element: <Write />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    element: <ProtectedRouteForAuth />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
