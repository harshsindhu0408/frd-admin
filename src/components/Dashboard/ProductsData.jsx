import React, { useState, useEffect } from "react";
import { PRODUCT_APIS } from "../../actions/apis";
import makeRequest from "../../utils/request";
import { errorNotify } from "../common/CustomToast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const ProductsData = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await makeRequest("GET", PRODUCT_APIS.getAllProducts);
        setProducts(response.products || []);
      } catch (error) {
        if (error.response) {
          errorNotify(error.response.data.message);
        } else {
          console.error("Error fetching product data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products whenever startDate or endDate changes
    filterProducts(startDate, endDate);
  }, [startDate, endDate]);

  const filterProducts = (start, end) => {
    let filteredProducts = products;
    if (start && end) {
      filteredProducts = products.filter((product) => {
        const productDate = new Date(product.updatedAt);
        return productDate >= start && productDate <= end;
      });
    }
    setFilteredProducts(filteredProducts);
  };

  // Get today's date
  const today = new Date();
  // Set initial end date one day ahead of today
  const initialEndDate = new Date(today);
  initialEndDate.setDate(today.getDate() + 1);

  useEffect(() => {
    // Set initial end date one day ahead of today
    setEndDate(initialEndDate);
  }, []);

  useEffect(() => {
    // Set filtered products to all products upon page refresh
    setFilteredProducts(products);
  }, [products]);

  const filterProductsByDate = (days) => {
    const currentDate = new Date();
    const filteredProducts = products.filter((product) => {
      const productDate = new Date(product.updatedAt);
      const timeDifference = currentDate - productDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference <= days;
    });
    const percentage = (filteredProducts.length / products.length) * 100 || 0;
    return percentage.toFixed(2); // Display up to two decimal places
  };

  const filterProductsByDateRange = () => {
    const totalProductsInRange = filteredProducts.length;
    const totalProducts = products.length;
    const percentage = (totalProductsInRange / totalProducts) * 100 || 0;
    return percentage.toFixed(2); // Display up to two decimal places
  };

  return (
    <div className="relative w-full px-4 py-6 bg-white shadow-md rounded-lg test-dark:bg-gray-700">
      <div className="flex flex-col gap-y-6 items-start">
        <div className="flex flex-col w-full">
          <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max test-dark:text-white">
            Total Products
          </p>
          <div className="flex flex-row items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="px-4 py-1 w-full border border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline mr-2"
              placeholderText="Start Date"
              maxDate={today}
              showYearDropdown // Enable year dropdown
              scrollableYearDropdown
            />
            <p className="mx-2">to</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 1
                )
              }
              className="px-4 py-1 border w-full border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline"
              placeholderText="End Date"
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
        </div>
        {!loading && (
          <p className="text-5xl font-bold">{filteredProducts.length}</p>
        )}
      </div>

      {!loading && (
        <div className="flex flex-col gap-y-2 my-6 space-y-2">
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max darkk:text-white">
              Total new added products in date range:
            </p>
            <p className="text-gray-800 text-sm">
              {filterProductsByDateRange()}%
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col flex-1 gap-4">
          <div className="w-1/6 mt-5 bg-gray-200 animate-pulse h-14 rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 my-6 space-y-2">
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max darkk:text-white">
              Today:
            </p>
            <div className="flex items-center">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                className="h-3 ml-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
              </svg>
              <p className="text-gray-800 text-sm">
                {filterProductsByDate(1)}%
              </p>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-200 items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700  w-max darkk:text-white">
              Last 7 days:
            </p>
            <div className="flex items-center">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                className="h-3 ml-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
              </svg>
              <p className="text-gray-800 text-sm">
                {filterProductsByDate(7)}%
              </p>
            </div>
          </div>
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max darkk:text-white">
              Last 30 days:
            </p>
            <div className="flex items-center">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                className="h-3 ml-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
              </svg>
              <p className="text-gray-800 text-sm">
                {filterProductsByDate(30)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsData;
