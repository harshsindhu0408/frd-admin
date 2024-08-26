import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ORDER_APIS } from "../../actions/apis";
import makeRequest from "../../utils/request";
import { errorNotify } from "../common/CustomToast";

const SalesData = () => {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date()); // Set end date to today's date

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await makeRequest("GET", ORDER_APIS.getAllOrders);

        if (
          response.success &&
          response.order &&
          Array.isArray(response.order)
        ) {
          setOrders(response.order);
        } else {
          console.error("Invalid response format:", response);
          setOrders([]);
        }
      } catch (error) {
        if (error.response) {
          errorNotify(error.response.data.message);
        } else {
          console.error("Error fetching order data:", error);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  console.log("orders on platform", orders);

  const calculateTotalSales = () => {
    const total = orders
      .filter(
        (order) =>
          (order.status.statusType === "delivered" ||
            order.status.statusType === "OrderPlaced") &&
          (!startDate ||
            !endDate ||
            (new Date(order.orderDate) >= startDate &&
              new Date(order.orderDate) <= endDate))
      )
      .reduce((acc, order) => {
        // Parse orderTotalAmount as a float, handle any errors
        const amount = parseFloat(order.orderTotalAmount);
        return !isNaN(amount) ? acc + amount : acc;
      }, 0);

    setTotalSales(total.toFixed(2));
  };

  const filterSalesByDate = () => {
    let filteredOrders = orders;

    if (startDate && endDate) {
      filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    const totalFilteredSales = filteredOrders
      .filter((order) => order.status.statusType === "delivered")
      .reduce((acc, order) => acc + parseFloat(order.orderTotalAmount), 0);

    // Calculate the total sales within the specified date range
    const totalSalesInRange = orders
      .filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate >= startDate &&
          orderDate <= endDate &&
          order.status.statusType === "delivered"
        );
      })
      .reduce((acc, order) => acc + parseFloat(order.orderTotalAmount), 0);

    // Calculate the percentage of filtered sales relative to total sales in the date range
    return ((totalFilteredSales / (totalSalesInRange || 1)) * 100 || 0).toFixed(
      2
    );
  };

  useEffect(() => {
    calculateTotalSales();
  }, [orders, startDate, endDate]);

  const today = new Date();

  const filterSalesForStaticRange = (days) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - days); // Calculate the start date based on the number of days

    const filteredSales = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return (
        orderDate >= startDate &&
        orderDate <= currentDate &&
        (order.status.statusType === "delivered" ||
          order.status.statusType === "OrderPlaced")
      );
    });

    const totalFilteredSales = filteredSales.reduce(
      (acc, order) => acc + parseFloat(order.orderTotalAmount),
      0
    );

    const totalSalesInRange = orders
      .filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate >= startDate &&
          orderDate <= currentDate &&
          order.status.statusType === "delivered"
        );
      })
      .reduce((acc, order) => acc + parseFloat(order.orderTotalAmount), 0);

    return ((totalFilteredSales / (totalSalesInRange || 1)) * 100 || 0).toFixed(
      2
    );
  };

  return (
    <div className="relative w-full px-4 py-6 bg-white shadow-md rounded-lg test-dark:bg-gray-700">
      <div className="flex gap-y-6 flex-col items-start">
        <div className="flex flex-col w-full">
          <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max test-dark:text-white">
            Total Sales
          </p>
          <div className="flex flex-row items-center justify-between">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={today}
              showYearDropdown
              scrollableYearDropdown
              placeholderText="Start Date"
              className="px-4 py-1 w-full border border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline mr-2"
            />
            <p className="mx-2">to</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={today}
              showYearDropdown
              scrollableYearDropdown
              placeholderText="End Date"
              className="px-4 py-1 w-full border border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline mr-2"
            />
          </div>
        </div>
        {!loading && <p className="text-5xl font-bold">$ {totalSales || 0}</p>}
      </div>

      {!loading && (
        <div className="flex flex-col gap-y-2 my-6 space-y-2">
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max darkk:text-white">
              Total sales % in date range:
            </p>
            <p className="text-gray-800 text-sm">{filterSalesByDate()}%</p>
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
                {filterSalesForStaticRange(1)} %
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
                {filterSalesForStaticRange(7)}%
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
                {filterSalesForStaticRange(30)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesData;
