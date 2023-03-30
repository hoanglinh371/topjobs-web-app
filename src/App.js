import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';

import Me from './features/user/Me';
const Home = lazy(() => import('./features/user/Home'));
const Admin = lazy(() => import('./features/admin/Admin'));
const Auth = lazy(() => import('./features/auth/Auth'));

const App = () => {
  return (
    <React.Suspense>
      <Header />
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/me' element={<Me />} />
        <Route path='/auth/*' element={<Auth />} />
      </Routes>
    </React.Suspense>
  );
};

export default App;
