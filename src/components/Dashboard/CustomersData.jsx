import React, { useState, useEffect } from "react";
import { CUSTOMER_APIS } from "../../actions/apis";
import makeRequest from "../../utils/request";
import { errorNotify } from "../common/CustomToast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomersData = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await makeRequest(
          "GET",
          CUSTOMER_APIS.getAllCustomers
        );
        setCustomers(response.customers || []);
        setFilteredCustomers(response.customers || []); // Initialize filteredCustomers with all customers
      } catch (error) {
        if (error.response) {
          errorNotify(error.response.data.message);
        } else {
          console.error("Error fetching customer data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers(startDate, endDate);
  }, [startDate, endDate]);

  const filterCustomers = (start, end) => {
    let filteredCustomers = customers;
    if (start && end) {
      filteredCustomers = customers.filter((customer) => {
        const registrationDate = new Date(customer.createdAt);
        return registrationDate >= start && registrationDate <= end;
      });
    }
    setFilteredCustomers(filteredCustomers);
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

  const filterCustomersByDate = (days) => {
    const currentDate = new Date();
    const filteredCustomers = customers.filter((customer) => {
      const registrationDate = new Date(customer.createdAt);
      const timeDifference = currentDate - registrationDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference <= days;
    });
    const percentage = (filteredCustomers.length / customers.length) * 100 || 0;
    return percentage.toFixed(2);
  };

  const filterCustomersByDateRange = () => {
    const totalCustomersInRange = filteredCustomers.length;
    const totalCustomers = customers.length;
    const percentage = (totalCustomersInRange / totalCustomers) * 100 || 0;
    return percentage.toFixed(2);
  };

  return (
    <div className="relative w-full px-4 py-6 bg-white shadow-md rounded-lg test-dark:bg-gray-700">
      <div className="flex gap-y-6 flex-col items-start">
        <div className="flex flex-col w-full">
          <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max test-dark:text-white">
            Total Customers
          </p>
          <div className="flex flex-row items-center justify-between">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="px-4 py-1 w-full border border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline mr-2"
              placeholderText="Start Date"
              maxDate={today}
              showYearDropdown
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
          <p className="text-5xl font-bold">{filteredCustomers.length}</p>
        )}
      </div>

      {!loading && (
        <div className="flex flex-col gap-y-2 my-6 space-y-2">
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max darkk:text-white">
              New customers % in date range:
            </p>
            <p className="text-gray-800 text-sm">
              {filterCustomersByDateRange()}%
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
                {filterCustomersByDate(1)}%
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
                {filterCustomersByDate(7)}%
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
                {filterCustomersByDate(30)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersData;
