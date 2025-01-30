import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const LoginPages = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple input validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Invalid email format!");
    }
   

    try {
      const response = await axios.post(
        "http://localhost:1003/api/v1/user/login",
        {
      
          Email: email,
          Password: password,
        }
      );

      if (response.data.success) {
        toast.error(response.data.message);
    } else {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Login Page</h2>
      <form onSubmit={handleSubmit}>
     
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="mt-3">
        <span>Already have an account? </span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPages;


