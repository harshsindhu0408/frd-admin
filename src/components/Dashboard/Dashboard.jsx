import React, { useState, useEffect } from "react";
import TopSellingProductsData from "./TopSellingProductsData";
import TotalOrders from "./Components/TotalOrders";
import TotalSales from "./Components/TotalSales";
import TotalProducts from "./Components/TotalProducts";
import ProductsData from "./ProductsData";
import SalesData from "./SalesData";
import CustomersData from "./CustomersData";

const DashBoard = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const currentHourIST = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      });
      const hour = parseInt(currentHourIST);

      if (hour >= 4 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    getGreeting();
  }, []);
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex flex-col mt-8 w-full md:space-y-4">
          <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
            <h1 className="text-4xl font-semibold text-gray-800">{greeting}</h1>
            <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
              <div className="flex items-center w-full space-x-4">
                <TotalProducts />
                <TotalOrders />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-2">
              {/* <div className="w-full">
                <CustomersData />
              </div> */}
              <div className="w-full">
                <ProductsData />
              </div>
              <div className="w-full">
                <SalesData />
              </div>
            </div>
            {/* <div className="w-full">
              <TopSellingProductsData />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
