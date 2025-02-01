import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="container mt-4 top-5px">
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4 className="mb-3">User Dashboard</h4>
          <NavLink
            to="/dashboard"
            className="list-group-item list-group-item-action bg-light text-dark mb-2 rounded"
            activeClassName="active"
          >
            Dashboard
          </NavLink>

       
          <NavLink
            to="/dashboard/recorde"
            className="list-group-item list-group-item-action bg-light text-dark mb-2 rounded"
            activeClassName="active"
          >
            All Recorde
          </NavLink>

          <NavLink
            to="/dashboard/income"
            className="list-group-item list-group-item-action bg-light text-dark mb-2 rounded"
            activeClassName="active"
          >
            Add Income
          </NavLink>

          <NavLink
            to="/dashboard/expense"
            className="list-group-item list-group-item-action bg-light text-dark mb-2 rounded"
            activeClassName="active"
          >
            Add Expenses
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
