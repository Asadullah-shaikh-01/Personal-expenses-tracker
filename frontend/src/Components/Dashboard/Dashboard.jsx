import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/Auth";
import UserMenu from "../Layout/UserMenu";
import Layout from "../Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [auth] = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Fetch total income
  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get("http://localhost:1003/api/v1/get-income", {
       
      });

      if (response.data.success) {
        const incomeTotal = response.data.records.reduce((total, record) => total + record.amount, 0);
        setTotalIncome(incomeTotal);
      } else {
        toast.error("Error fetching income data :", response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching income data:", error.message);
    }
  };

  // Fetch total expense
  const fetchTotalExpense = async () => {
    try {
      const response = await axios.get("http://localhost:1003/api/v1/get-expenses");

      if (response.data.success) {
        const expenseTotal = response.data.records.reduce((total, record) => total + record.amount, 0);
        setTotalExpense(expenseTotal);
      } else {
        toast.error("Error fetching expense data:", response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching expense data:", error.message);
    }
  };


  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpense();
  }, []);

  return (
    <Layout>
      <div className="container-fluid my-4 mt-15">
        <div className="row">
          {/* User Menu */}
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>

          {/* User Information Card */}
          <div className="col-md-9">
            <div className="card shadow-sm p-4">
              <h3 className="fs-4 fw-bold">User Dashboard</h3>
              <div className="mt-3">
                <div className="row">
                  {/* Total Income Card */}
                  <div className="col-md-6 mb-4">
                    <div className="card p-4 shadow-sm">
                      <h5 className="card-title">Total Saving Income</h5>
                      <p className="card-text fs-3 fw-bold">${totalIncome.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Total Expense Card */}
                  <div className="col-md-6 mb-4">
                    <div className="card p-4 shadow-sm">
                      <h5 className="card-title">Total Expenses for this Moth</h5>
                      <p className="card-text fs-3 fw-bold">${totalExpense.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
