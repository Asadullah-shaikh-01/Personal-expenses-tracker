import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react"; // Ensure you are using Clerk's useUser hook correctly
import { useFinancialRecords } from "../Context/financial-record"; // Use the custom hook to get records
import FinanceRecord from "./Recorde"; // Ensure this component exists

export const DashboardAll = () => {
  const { user } = useUser(); // Get the current user
  const { records } = useFinancialRecords(); // Use custom hook to get records

  // ✅ Calculate total monthly income
  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    // Ensure records contains both income and expense data
    records.forEach((record) => {
      if (record.type === "income") {
        totalAmount += record.amount;
      }
    });
    return totalAmount;
  }, [records]); // Recalculate if records change

  // Handle loading state for user and records
  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (!records) {
    return <div>Loading finance records...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome {user.firstName}!</h1>
      <div>Total Monthly Income: ${totalMonthly}</div>

      <h1>Here Are Your Finance Details:</h1>
      <FinanceRecord records={records} /> {/* Pass records as a prop to FinanceRecord */}
    </div>
  );
};

export default DashboardAll;
