import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import Single from '../pages/Single/Single';
import Write from '../pages/Write/Write';
import Layout from '../utils/Layout';
import ProtectedRoute from '../utils/ProtectedRoute';
import ProtectedRouteForAuth from '../utils/ProtectedRouteForAuth';

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
      {
        path: '/*',
        element: <Navigate to='/' />,
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
