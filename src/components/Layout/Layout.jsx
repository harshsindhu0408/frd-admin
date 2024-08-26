import React from "react";
import Sidebar from "../common/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row h-screen bg-gray-100 overflow-y-scroll">
      {/* sidebar-section */}
      <div className="w-72">
        <Sidebar />
      </div>

      {/* children-section */}
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  );
};

export default Layout;
