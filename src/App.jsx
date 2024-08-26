import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Page404 from "./pages/Login/erros/Page404";
import Customers from "./pages/Customers/Customers";
import Home from "./pages/Home";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import { Toaster } from "react-hot-toast";
import CustomersView from "./pages/Customers/CustomersView";
import AddProduct from "./pages/Products/AddProduct";
import ProductView from "./pages/Products/ProductView";
import OrderView from "./pages/Orders/OrderView";
import Categories from "./pages/Category/Categories";
import CategoryView from "./pages/Category/CategoryView";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const location = useLocation(); // current path location
  const [isAuthenticated, setAuthenticated] = React.useState(false); // state for authentication user

  // check user is authenticated or not on page load. If user is authenticated then set authenticated state to true, else set authenticated state to false.
  React.useEffect(() => {
    if (localStorage.getItem("token")) setAuthenticated(true);
    else setAuthenticated(false);
  }, [location]);
  return (
    <>
      {/* toaster container for react-hot-toast */}
      <Toaster position="top-right" containerStyle={{ position: "absolute" }} />

      {/* application routes here. */}
      <Routes>
        {/* home route */}
        {!isAuthenticated ? (
          <Route path="/" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            {/* Product routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductView />} />

            {/* Order routes */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderView />} />

            {/* Customer routes */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomersView />} />

            {/* Category routes */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryView />} />

            {/* profile */}
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        {/* error routes */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
