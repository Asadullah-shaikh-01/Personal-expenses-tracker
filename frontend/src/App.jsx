import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import RegisterPages from './pages/Register/RegisterPages';
import LoginPages from './pages/Login/LoginPages';
import DashboardAll from './Components/Dashboard/DashboardAll';
import Income from './Components/Dashboard/Income';
import Expenses from './Components/Dashboard/Expenses';
import Recorde from './Components/Dashboard/Recorde';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPages />} />

        {/* Parent route with nested routes */}
        <Route path="/dashboard" element={<DashboardAll />}>
          <Route path="income" element={<Income />} /> {/* Nested route for Income */}
          <Route path="expense" element={<Expenses />} /> {/* Nested route for Expenses */}
          <Route path="recorde" element={<Recorde />} /> {/* Nested route for Expenses */}
        </Route>

        {/* You can also use wildcard route for 404 or undefined routes */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
