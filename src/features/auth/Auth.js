import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import UpdatePassword from './UpdatePassword';

const Auth = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      <Route path='/update-password' element={<UpdatePassword />} />
    </Routes>
  );
};

export default Auth;
