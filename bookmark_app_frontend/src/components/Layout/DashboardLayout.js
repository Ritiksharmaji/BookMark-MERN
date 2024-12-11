// components/Layout/DashboardLayout.js
import React from "react";
import ProfileHeader from "../Header/ProfileHeader";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      {/* Common Header */}
      {/* <ProfileHeader />
       */}
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
