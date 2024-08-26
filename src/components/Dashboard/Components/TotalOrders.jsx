import React, { useState, useEffect } from "react";
import getAllOrders from "../../../actions/orders/getAllOrders";

const TotalOrders = () => {
  // const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    getAllOrders().then((orders) => {
      // setOrders(orders);
      setOrderCount(orders.length);
    });
  }, []);
  return (
    <div className="w-1/2">
      <div className="relative  w-full px-4 py-5 bg-white shadow-md rounded-lg darkk:bg-gray-700">
        <p className="text-2xl font-bold text-black darkk:text-white">
          {orderCount}
        </p>
        <p className="text-sm text-gray-400">Total order count till date</p>
      </div>
    </div>
  );
};

export default TotalOrders;
