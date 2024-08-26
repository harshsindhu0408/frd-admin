import { useNavigate } from "react-router-dom";
import React from "react";
import CustomDialog from "../../components/common/Dialog/CustomDialog";
import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";
import addCategory from "../../actions/categories/addCategory";

const CategoryHeader = ({ onCategoryAdd }) => {
  const [isOpen, setDialogOpen] = React.useState(false);
  const [category, setCategory] = React.useState({ name: "", description: "" });

  function handleAddCategory(e) {
    e.preventDefault();
    addCategory(category).then(() => {
      setDialogOpen(false);
      setCategory({ name: "", description: "" });
      onCategoryAdd();
    });
  }

  return (
    <div className="flex">
      {/* Add new button */}
      <CustomButton
        onClick={() => setDialogOpen(true)}
        className="h-9 w-24 text-sm"
      >
        Add New
      </CustomButton>

      {isOpen && (
        <CustomDialog
          title="Add New Category"
          setDialog={setDialogOpen}
          closeDailog={() => setDialogOpen(false)}
        >
          {/* body */}
          <form onSubmit={handleAddCategory}>
            <CustomInput
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              value={category.name}
              placeholder="Category Name"
              required
            />

            <CustomInput
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              value={category.description}
              placeholder="Category Description"
              required
            />

            {/* modal footer */}
            <div className="text-end mt-1">
              <CustomButton
                className="mr-2 bg-orange-500 hover:bg-orange-600"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </CustomButton>
              <CustomButton type="submit">Submit</CustomButton>
            </div>
          </form>
        </CustomDialog>
      )}
    </div>
  );
};

export default CategoryHeader;
