import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RegisterPages from "./pages/Register/RegisterPages";
import LoginPages from "./pages/Login/LoginPages";
import Dashboard from "./Components/Dashboard/Dashboard";

import PrivateRoute from "./Components/Routes/Private"; // Ensure this is properly imported
import Income from "./Components/transactions/Income";
import Expenses from "./Components/transactions/Expenses";
import Records from "./Components/transactions/Records";

const App = () => {
  return (
    <>
      <Routes>
        {/* Login and Register Routes */}
        <Route exact path="/" element={<LoginPages />} />
        <Route exact path="/login" element={<LoginPages />} />
        <Route exact path="/register" element={<RegisterPages />} />

        {/* Protected Route for Dashboard */}
        {/* Parent route for Dashboard with nested routes */}
        
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/income" element={<Income />} />
          <Route exact path="/dashboard/expense" element={<Expenses />} />
          <Route exact path="/dashboard/recorde" element={<Records />} />
        
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
