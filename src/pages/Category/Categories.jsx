import React from "react";
import { useNavigate } from "react-router-dom";
import getAllCategories from "../../actions/categories/getAllCategories";
import Layout from "../../components/Layout/Layout";
import { categoryColumns } from "../../utils/table_columns";
import CustomTable from "../../components/common/CustomTable/CustomTable";
import CategoryHeader from "./CategoryHeader";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    // get categories from server
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [refreshData]);

  // handle proccess on row click
  function handleRowClicked(row) {
    navigate(`/categories/${row._id}`);
  }

  return (
    <Layout>
      <div className="p-4">
        {/* categories table */}
        <CustomTable
          header={
            <CategoryHeader
              onCategoryAdd={() => setRefreshData(!refreshData)}
            />
          }
          onRowClicked={(row) => handleRowClicked(row)}
          title="Categories"
          loading={loading}
          columns={categoryColumns}
          data={categories && categories}
        />
      </div>
    </Layout>
  );
};

export default Categories;
