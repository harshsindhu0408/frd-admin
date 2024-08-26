import React, { useEffect } from "react";
import FilterButton from "../../components/common/FilterButton";
import CustomDialog from "../../components/common/Dialog/CustomDialog";
import CustomButton from "../../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import getAllCategories from "../../actions/categories/getAllCategories";
import CustomInput from "../../components/common/CustomInput";

const ProductHeader = ({
  search,
  category,
  quantity,
  setSearch,
  setCategory,
  setQuantity,
}) => {
  const [isOpen, setDialogOpen] = React.useState(false);
  const [categoryOptions, setCategoryOptions] = React.useState(null);
  const navigate = useNavigate();

  // on search
  function handleSearch(value) {
    setSearch(value);
  }

  function handleCategorySelect(selected) {
    setCategory(selected);
  }

  function handleQuantitySelect(selected) {
    setQuantity(selected);
  }

  // get categoryOptions
  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategoryOptions(categories);
    });
  }, []);

  return (
    <div className="flex items-center">
      {/* search box */}
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        className="h-9 w-64 px-2 text-sm border rounded-lg focus:outline-0"
        placeholder="Search product"
      />
      {/* filter button */}
      <FilterButton onClick={() => setDialogOpen(true)} />

      {/* Add new button */}
      <CustomButton
        onClick={() => navigate("./add")}
        className="h-9 w-24 text-sm"
      >
        Add New
      </CustomButton>

      {/* filter dialog */}
      {isOpen && (
        <CustomDialog
          title="Filter Products"
          setDialog={setDialogOpen}
          closeDailog={() => setDialogOpen(false)}
        >
          {/* category filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="cursor-pointer block px-2 py-2 text-gray-700 text-sm bg-white border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All</option>
              {categoryOptions &&
                categoryOptions.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block my-2 text-sm font-medium text-gray-900">
              Quantity
            </label>
            <CustomInput
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => handleQuantitySelect(e.target.value)}
            />
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

export default ProductHeader;
