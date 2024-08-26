import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import getAllProducts from "../../actions/products/getAllProducts";
import { productColumns } from "../../utils/table_columns";
import CustomTable from "../../components/common/CustomTable/CustomTable";
import ProductHeader from "./ProductHeader";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearchFilter] = useState("");
  const [category, setCategoryFilter] = useState("all");
  const [quantity, setQuantityFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  function handleViewProduct(productId) {
    // Navigate to the product page
    navigate(`/products/${productId}`);
  }

  return (
    <Layout>
      <div className="p-4">
        <CustomTable
          onRowClicked={(row) => handleViewProduct(row._id)}
          header={
            <ProductHeader
              setSearch={setSearchFilter}
              setCategory={setCategoryFilter}
              setQuantity={setQuantityFilter}
              search={search}
              category={category}
              quantity={quantity}
            />
          }
          title="All Products"
          loading={loading}
          columns={productColumns}
          data={
            products &&
            products.filter((product) => {
              // Apply filters
              const nameMatches = product.name
                .toLowerCase()
                .includes(search.toLowerCase());
              const categoryMatches =
                category === "all" || product.category.name === category;
              const quantityMatches =
                quantity === "" || quantity == product.quantity;

              return nameMatches && categoryMatches && quantityMatches;
            })
          }
        />
      </div>
    </Layout>
  );
};

export default Products;
