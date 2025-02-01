import React from "react";
import Layout from "../Layout/Layout";
import UserMenu from "../Layout/UserMenu"; // Ensure UserMenu is correctly imported
import GetTransactions from "../Layout/GetTransactions";
import GetTransactions2 from "../Layout/GetTransactions2";

const Records = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            {/* Render User Menu */}
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4">
              <h3>Transactions</h3>
              {/* Render both GetTransactions and GetTransactions2 components */}
              <GetTransactions2 />
              <GetTransactions />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Records;
