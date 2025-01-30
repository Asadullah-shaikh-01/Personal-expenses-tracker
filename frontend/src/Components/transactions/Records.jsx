import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import UserMenu from "../Layout/UserMenu";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [recordType, setRecordType] = useState<string>("income"); // Toggle between income and expenses

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          recordType === "income"
            ? "http://localhost:1003/api/v1/get-income"
            : "http://localhost:1003/api/v1/get-expenses"
        );
        if (response.data.success) {
          setRecords(response.data.records);
        } else {
          console.error("Error fetching records:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, [recordType]); // Re-fetch records when the recordType changes

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(
        recordType === "income"
          ? `http://localhost:1003/api/v1/delete-income/${id}`
          : `http://localhost:1003/api/v1/delete-expenses/${id}`
      );
      if (response.data.success) {
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== id)
        );
      } else {
        console.error("Error deleting record:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Calculate total income or total expenses
  const calculateTotal = (amount) => {
    return records
      .filter((record) => record.type === amount)
      .reduce((total, record) => total + record.amount, 0);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4">
              <h3>Records</h3>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => setRecordType("income")}
                >
                  Show Income
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => setRecordType("expense")}
                >
                  Show Expenses
                </button>
              </div>

              <h4 className="mt-3">
                Total {recordType.charAt(0).toUpperCase() + recordType.slice(1)}: $
                {calculateTotal(recordType)}
              </h4>

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
                  {records.map((record) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Records;
