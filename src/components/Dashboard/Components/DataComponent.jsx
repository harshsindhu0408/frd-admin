import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ORDER_APIS, PRODUCT_APIS } from "../../actions/apis";
import makeRequest from "../../utils/request";
import { errorNotify } from "../common/CustomToast";

const DataComponent = ({ apiUrl, title }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeRequest("GET", apiUrl);
        setData(response.products || []);
      } catch (error) {
        if (error.response) {
          errorNotify(error.response.data.message);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    filterData(startDate, endDate);
  }, [startDate, endDate, data]);

  const filterData = (start, end) => {
    let filteredData = data;
    if (start && end) {
      filteredData = data.filter((item) => {
        const itemDate = new Date(item.updatedAt);
        return itemDate >= start && itemDate <= end;
      });
    }
    setFilteredData(filteredData);
  };

  const calculatePercentage = (days) => {
    if (!filteredData.length) return "0.00";
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days);

    const filteredCount = filteredData.filter((item) => {
      const itemDate = new Date(item.updatedAt);
      return itemDate >= startDate && itemDate <= today;
    }).length;

    const percentage = ((filteredCount / filteredData.length) * 100).toFixed(2);
    return percentage;
  };

  return (
    <div className="relative w-full px-4 py-6 bg-white shadow-md rounded-lg test-dark:bg-gray-700">
      <div className="flex gap-y-6 flex-col items-start">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max test-dark:text-white">
            {title}
          </p>
          <div className="flex flex-row items-center justify-between">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="px-4 py-1 w-[150px] border border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline mr-2"
            />
            <p className="mr-2">to</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="px-4 py-1 w-[150px] border border-gray-400 hover:border-gray-500 rounded focus:outline-none focus:shadow-outline mr-2"
            />
          </div>
        </div>
        {!loading && (
          <p className="text-5xl font-bold">
            {filteredData.length}
          </p>
        )}
      </div>

      {!loading && (
        <div className="flex flex-col gap-y-2 my-6 space-y-2">
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max test-dark:text-white">
              Today:
            </p>
            <p className="text-gray-800 text-sm">
              {calculatePercentage(1)}%
            </p>
          </div>
          <div className="flex justify-between border-b border-gray-200 items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max test-dark:text-white">
              Last 7 days:
            </p>
            <p className="text-gray-800 text-sm">
              {calculatePercentage(7)}%
            </p>
          </div>
          <div className="flex border-b border-gray-200 justify-between items-center text-xl font-bold text-green-500">
            <p className="text-sm font-semibold text-gray-700 w-max test-dark:text-white">
              Last 30 days:
            </p>
            <p className="text-gray-800 text-sm">
              {calculatePercentage(30)}%
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col flex-1 gap-4">
          <div className="w-1/6 mt-5 bg-gray-200 animate-pulse h-14 rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        </div>
      )}
    </div>
  );
};

export default DataComponent;
