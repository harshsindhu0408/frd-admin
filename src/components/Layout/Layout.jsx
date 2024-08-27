import React from "react";
import Sidebar from "../common/Sidebar/Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isMenuOpen = useSelector((state) => state.nav.isMenuOpen);

  return (
    <div className="flex flex-row h-screen bg-gray-100 overflow-y-scroll">
      {/* Conditionally render sidebar */}
      {isMenuOpen && (
        <div className="w-72">
          <Sidebar />
        </div>
      )}

      {/* Children section expands when sidebar is hidden */}
      <div className={`${isMenuOpen ? "w-full" : "w-full"} overflow-x-hidden`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
