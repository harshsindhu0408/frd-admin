import React from "react";
import FilterButton from "../../components/common/FilterButton";
import CustomDialog from "../../components/common/Dialog/CustomDialog";
import CustomButton from "../../components/common/CustomButton";

const TableFilter = ({ search, gender, setSearch, setGender }) => {
  const [isOpen, setDialogOpen] = React.useState(false);

  // on search
  function handleSearch(value) {
    setSearch(value);
  }

  // on gender select
  function handleGenderSelect(selected) {
    setGender(selected);
  }
  return (
    <div className="flex">
      {/* search box */}
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        className="h-9 w-64 px-2 text-sm border rounded-lg focus:outline-0"
        placeholder="Search customer"
      />

      {/* filter dialog button */}
      <FilterButton onClick={() => setDialogOpen(true)} />

      {isOpen && (
        <CustomDialog
          title="Filter Customers"
          setDialog={setDialogOpen}
          closeDailog={() => setDialogOpen(false)}
        >
          {/* gender filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Gender
            </label>
            {/* gender select */}
            <select
              value={gender}
              onChange={(e) => handleGenderSelect(e.target.value)}
              className="cursor-pointer block px-2 py-2 text-gray-700 text-sm bg-white border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* 
          <div className="text-end mt-1">
            <CustomButton onClick={() => setDialogOpen(false)}>
              Apply
            </CustomButton>
          </div> */}
        </CustomDialog>
      )}
    </div>
  );
};

export default TableFilter;
