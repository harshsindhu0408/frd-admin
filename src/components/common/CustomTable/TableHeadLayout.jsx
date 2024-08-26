import React from "react";

const TableHeadLayout = ({ title = "", children }) => {
  return (
    <div className="flex bg-white rounded-lg justify-between">
      {/* title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {children}
    </div>
  );
};

export default TableHeadLayout;
