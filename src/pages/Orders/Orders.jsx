import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { orderColumns } from "../../utils/table_columns";
import CustomTable from "../../components/common/CustomTable/CustomTable";
import OrderFilter from "./OrderFilter";
import getAllOrders from "../../actions/orders/getAllOrders";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearchFilter] = useState("");
  const [status, setStatusFilter] = useState("all");
  const [priceRange, setPriceRangeFilter] = useState({
    min: 0,
    max: 1000000,
  });

  useEffect(() => {
    setLoading(true);
    getAllOrders()
      .then((orders) => {
        setOrders(orders);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  console.log(orders);

  return (
    <Layout>
      <div className="p-4">
        <CustomTable
          header={
            <OrderFilter
              search={search}
              status={status}
              priceRange={priceRange}
              setSearch={setSearchFilter}
              setStatus={setStatusFilter}
              setPriceRange={setPriceRangeFilter}
            />
          }
          title="All Orders"
          loading={loading}
          columns={orderColumns}
          onRowClicked={(row) => navigate(`./${row._id}`)}
          data={
            orders &&
            orders.filter((order) => {
              // Apply filters
              const statusMatches =
                status === "all" || order.status.statusType === status;

              const priceRangeMatches =
                priceRange.min < order.orderTotalAmount &&
                order.orderTotalAmount <= priceRange.max;

              const searchMatches =
                order.customer.customerEmail
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                order.customer.address.contactNumber
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                order.generatedId
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                order.productName.some((product) =>
                  product.toLowerCase().includes(search.toLowerCase())
                );

              return statusMatches && priceRangeMatches && searchMatches;
            })
          }
        />
      </div>
    </Layout>
  );
};

export default Orders;
