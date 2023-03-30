import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Jobs from './Jobs';
import JobDetail from './JobDetail';

const Home = () => {
  return (
    <Routes>
      <Route index element={<Jobs />} />
      <Route path='/:_id' element={<JobDetail />} />
    </Routes>
  );
};

export default Home;
