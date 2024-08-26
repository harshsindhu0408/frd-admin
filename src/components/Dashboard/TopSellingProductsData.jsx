import React, { useState, useEffect } from "react";
import getAllOrders from "../../actions/orders/getAllOrders";
import getProduct from "../../actions/products/getProduct";
import { LoaderIcon } from "react-hot-toast";

const TopSellingProductsData = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const orders = await getAllOrders();

        const productSalesMap = new Map();

        const fetchProductDetails = async (productId) => {
          const productInfo = await getProduct(productId);
          return productInfo
            ? { name: productInfo.name, price: productInfo.price }
            : { name: "N/A", price: 0 };
        };

        for (const order of orders) {
          if (order.status.statusType === "pending" || order.status.statusType === "delivered") {
            const productId = order.product;
            if (!productSalesMap.has(productId)) {
              const productDetails = await fetchProductDetails(productId);

              productSalesMap.set(productId, {
                productName: productDetails.name,
                totalSales: 0,
                numberOfOrders: 0,
                productDetails,
                last7DaysSales: 0,
              });
            }

            productSalesMap.set(productId, {
              ...productSalesMap.get(productId),
              totalSales:
                productSalesMap.get(productId).totalSales +
                parseFloat(order.orderTotalAmount),
              numberOfOrders:
                productSalesMap.get(productId).numberOfOrders + 1,
            });
          }
        }

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7);

        for (const order of orders) {
          if (order.status.statusType === "pending" || order.status.statusType === "delivered") {
            if (new Date(order.orderDate) > currentDate) {
              const productId = order.product;
              if (productSalesMap.has(productId)) {
                productSalesMap.set(productId, {
                  ...productSalesMap.get(productId),
                  last7DaysSales:
                    productSalesMap.get(productId).last7DaysSales +
                    parseFloat(order.orderTotalAmount),
                });
              }
            }
          }
        }

        const topSellingProductsArray = Array.from(productSalesMap.values());
        topSellingProductsArray.sort((a, b) => b.totalSales - a.totalSales);
        setTopSellingProducts(topSellingProductsArray);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    if (loading) {
      fetchTopSellingProducts();
    }
  }, [loading]);

  return (
    <div className="w-full">
      <div className="relative w-full px-4 py-5 bg-white shadow-md rounded-lg">
        <p className="text-2xl border-b border-gray-200 w-max font-bold text-black">
          Top Selling Products
        </p>

        {loading ? (
          <div className="flex flex-row items-center justify-center text-center mt-4 gap-2">
            <LoaderIcon className="h-6 w-6" />
            <span className="text-md">Loading...</span>
          </div>
        ) : (
          <div className="mt-4">
            <table className="min-w-full border border-gray-100 text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Product Price</th>
                  <th className="py-2 px-4 border-b">Number of Orders</th>
                  <th className="py-2 px-4 border-b">Total Sales</th>
                  <th className="py-2 px-4 border-b">Last 7 Days Sales</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product) => (
                  <tr key={product.productName} className="border-b">
                    <td className="py-2 text-left font-semibold text-gray-700 w-max text-sm px-4">
                      {product.productName}
                    </td>
                    <td className="py-2 text-left text-sm font-semibold text-gray-700 w-max px-4">
                      $
                      {product.productDetails.price !== undefined
                        ? product.productDetails.price
                        : "N/A"}
                    </td>
                    <td className="py-2 text-left text-sm font-semibold text-gray-700 w-max px-4">
                      {product.numberOfOrders}
                    </td>
                    <td className="py-2 text-left font-semibold text-indigo-500 text-sm px-4">
                      $
                      {product.totalSales !== undefined
                        ? product.totalSales
                        : "N/A"}
                    </td>
                    <td className="py-2 text-left text-sm font-semibold text-gray-700 w-max px-4">
                      $
                      {product.last7DaysSales !== undefined
                        ? product.last7DaysSales
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSellingProductsData;
