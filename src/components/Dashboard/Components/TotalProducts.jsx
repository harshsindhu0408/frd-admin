import React, { useState, useEffect } from "react";
import getAllProducts from "../../../actions/products/getAllProducts";

const TotalProducts = () => {
  // const [products, setproducts] = useState([]);
  const [productCount, setproductCount] = useState(0);

  useEffect(() => {
    getAllProducts().then((products) => {
      // setproducts(products);
      setproductCount(products.length);
    });
  }, []);

  return (
    <div className="w-1/2">
      <div className="relative w-full px-4 py-5 bg-white shadow-md rounded-lg darkk:bg-gray-700">
        <p className="text-2xl font-bold text-black darkk:text-white">
          {productCount}
        </p>
        <p className="text-sm text-gray-400">Active products</p>
      </div>
    </div>
  );
};

export default TotalProducts;
