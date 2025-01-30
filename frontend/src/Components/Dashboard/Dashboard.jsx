import React from "react";
import { useAuth } from "../Context/Auth";
import UserMenu from "../Layout/UserMenu";
import Layout from "../Layout/Layout";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid my-4">
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
                <h5 className="fs-5">UserName: <span className="text-primary">{auth?.user?.Username}</span></h5>
                <h5 className="fs-5">Email: <span className="text-primary">{auth?.user?.Email}</span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
