import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context for financial records
const FinancialRecordContext = createContext(undefined);

// Custom hook to access the context
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordContext);
  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordProvider"
    );
  }
  return context;
};

// FinancialRecordProvider component to provide the context
export const FinancialRecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  // Fetch records from the API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1003/api/v1/get-income"
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
  }, []);

  // Add a new record (either income or expense)
  const addRecord = async (newRecord) => {
    try {
      const response = await axios.post(
        newRecord.type === "income"
          ? "http://localhost:1003/api/v1/add-income"
          : "http://localhost:1003/api/v1/add-expenses",
        newRecord
      );
      if (response.data.success) {
        setRecords((prevRecords) => [...prevRecords, response.data.record]);
      } else {
        console.error("Error adding record:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  // Delete a record
  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1003/api/v1/delete-income/${id}`
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


  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, deleteRecord, updateRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};
