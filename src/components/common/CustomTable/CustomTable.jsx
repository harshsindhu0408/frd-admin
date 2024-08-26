import React from "react";
import DataTable from "react-data-table-component";
import TableHeadLayout from "./TableHeadLayout";

const CustomTable = ({
  columns = [],
  data = [],
  loading = false,
  title,
  header,
  onRowClicked = function () {},
}) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <DataTable
        className="data-table"
        onRowClicked={(row) => onRowClicked(row)}
        title={<TableHeadLayout title={title}>{header}</TableHeadLayout>}
        progressPending={loading}
        columns={columns}
        data={data}
        pagination
      />
    </div>
  );
};

export default CustomTable;
