export const AUTH_APIS = {
  login: "/api/v1/admin/login",
  getProfile: "/api/v1/admin/profile",
  updateEmail: "/api/v1/admin/updateEmail",
  updatePassword: "/api/v1/admin/updatePassword",
};

export const ADMIN_APIS = {
  sendMail: "/api/v1/admin/deliveryUpdateEmail",
};

export const CUSTOMER_APIS = {
  getAllCustomers: "/api/v1/admin/allCustomers",
  getCustomer: "/api/v1/admin/singleCustomer",
  deleteCustomer: "/api/v1/admin/deleteCustomer",
  getAddresses: "api/v1/customer/addresses", // :customer_id
};

export const PRODUCT_APIS = {
  getAllProducts: "/api/v1/product/getAllProducts",
  getProduct: "/api/v1/product/getProduct", // :product_id
  addProduct: "/api/v1/product/addProduct",
  updateProduct: "/api/v1/product/updateProduct", // :product_id
  deleteProduct: "/api/v1/product/deleteProduct", // :product_id
};

export const ORDER_APIS = {
  getAllOrders: "/api/v1/admin/allOrders",
  getOrder: "/api/v1/order/details", // :order_id
  updateOrder: "/api/v1/admin/update", // :order_id
  deleteOrder: "/api/v1/order/delete", // :order_id
};

export const CATEGORIES_APIS = {
  getAllCategories: "/api/v1/category/allCategories",
  getCategory: "/api/v1/category", // :categoryId
  addCategory: "/api/v1/category/add",
  deleteCategory: "/api/v1/category/delete", // :categoryId
};
