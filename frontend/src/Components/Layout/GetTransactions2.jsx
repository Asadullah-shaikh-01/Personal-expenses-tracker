import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import Layout from "./Layout";

import { useAuth } from "../Context/Auth";

const GetTransactions2 = () => {
  const [auth, setAuth] = useAuth();
  const [records, setRecords] = useState([]);

    const [recordType, setRecordType] = useState("expenses");

  // Fetch Expenses
  const fetchRecords = async () => {
    try {
      // Get token from localStorage

      const response = await axios.get(
        "http://localhost:1003/api/v1/get-expenses" );

      if (response.data.success) {
        setRecords(response.data.records);
      } else {
        toast.error(`Error fetching expenses: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching expenses: ${error.message}`);
    }
  };

  // Delete Record
  const deleteRecord = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:1003/api/v1/delete-expense/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== id)
        );
        toast.success("Record deleted successfully");
      } else {
        toast.error(`Error deleting record: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Error deleting record: ${error.message}`);
    }
  };

  // Calculate total expenses
  const calculateTotal = () => {
    return records.reduce((total, record) => total + record.amount, 0);
  };

  // Fetch records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="card p-4">
              <h3>Transactions</h3>

              {/* Buttons to switch between Income & Expenses */}
              <div>
                <button
                  className={`btn ${
                    recordType === "income" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => setRecordType("income")}
                >
                  Show Income
                </button>
                <button
                  className={`btn ${
                    recordType === "expense" ? "btn-primary" : "btn-secondary"
                  } ms-2`}
                  onClick={() => setRecordType("expense")}
                >
                  Show Expenses
                </button>
              </div>

              {/* Display Total Income or Expenses */}
              <h4 className="mt-3">
                Total {recordType.charAt(0).toUpperCase() + recordType.slice(1)}
                : ${calculateTotal()}
              </h4>

              {/* Records Table */}
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((record) => (
                      <tr key={record._id}>
                        <td>{record.title}</td>
                        <td>{record.description}</td>
                        <td>${record.amount}</td>
                        <td>{record.category}</td>
                        <td>{record.type}</td>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => deleteRecord(record._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GetTransactions2;
