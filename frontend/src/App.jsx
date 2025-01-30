import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RegisterPages from "./pages/Register/RegisterPages";
import LoginPages from "./pages/Login/LoginPages";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/transactions/Income";
import Expenses from "./Components/transactions/Expenses";
import Records from "./Components/transactions/Records";
import PrivateRoute from "./Components/Routes/Private"; // Ensure this is properly imported

const App = () => {
  return (
    <>
      <Routes>
     

        {/* Login and Register Routes */}
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPages />} />

        {/* Protected Route for Dashboard */}
        <Route >
          {/* Parent route for Dashboard with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expenses />} />
            <Route path="recorde" element={<Records />} />
          </Route>
        </Route>

      
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
