import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home, Login, Register } from '../index'
import AuthenticatedComponent from '../../components/AuthenticatedComponent';
import Header from '../../components/Header';
import Cookies from 'js-cookie';

const signout = () => {
  Cookies.remove('token')
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <AuthenticatedComponent><Header signout={signout} /><Home /></AuthenticatedComponent>
  },

]);

function App() {
  return (
    <div className='bg-[#f7f7f7]'><RouterProvider router={router} /></div>
  )
}

export default App
