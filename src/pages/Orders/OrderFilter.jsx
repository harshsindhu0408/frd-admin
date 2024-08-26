import React from "react";
import FilterButton from "../../components/common/FilterButton";
import CustomDialog from "../../components/common/Dialog/CustomDialog";
import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";

const OrderFilter = ({
  search,
  status,
  priceRange,
  setSearch,
  setStatus,
  setPriceRange,
}) => {
  const [isOpen, setDialogOpen] = React.useState(false);

  // on status select
  function handleStatusSelect(selected) {
    setStatus(selected);
  }
  function handlePriceRangeSelect(selected) {
    setPriceRange(selected);
  }
  function handleSearch(value) {
    setSearch(value);
  }

  return (
    <div className="flex">
      {/* search box */}
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        className="h-9 w-64 px-2 text-sm border rounded-lg focus:outline-0"
        placeholder="Search order"
      />
      {/* status filter */}
      <FilterButton onClick={() => setDialogOpen(true)} />

      <div>
        {isOpen && (
          <CustomDialog
            title="Filter Orders"
            setDialog={setDialogOpen}
            closeDailog={() => setDialogOpen(false)}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => handleStatusSelect(e.target.value)}
                className="cursor-pointer block px-2 py-2 text-gray-700 text-sm bg-white border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All</option>
                <option value="OrderPlaced">OrderPlaced</option>
                <option value="delivered">Delivered</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* price range filter */}
            <div className="mt-3">
              <label className="block mt-2 text-sm font-medium text-gray-900">
                Price Range
              </label>
              <div className="flex items-center">
                <CustomInput
                  type="number"
                  placeholder="min price"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                />
                <span>-</span>
                <CustomInput
                  type="number"
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  placeholder="max price"
                  value={priceRange.max}
                />
              </div>
            </div>

            {/* <div className="text-end mt-1">
              <CustomButton onClick={() => setDialogOpen(false)}>
                Apply
              </CustomButton>
            </div> */}
          </CustomDialog>
        )}
      </div>
    </div>
  );
};

export default OrderFilter;
