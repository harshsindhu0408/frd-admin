import dateFormatter from "./dateFormatter";

export const customerColumns = [
  {
    name: "#",
    selector: (row, index) => index + 1,
    sortable: true, // Enable sorting for the Name column
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true, // Enable sorting for the Name column
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true, // Enable sorting for the Email column
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dob,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
  },
  {
    name: "Created At",
    selector: (row) => dateFormatter(row.createdAt),
    sortable: true,
  },
  {
    name: "Updated At",
    selector: (row) => dateFormatter(row.updatedAt),
    sortable: true,
  },
];

export const productColumns = [
  {
    name: "#",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category.name,
    sortable: true,
  },
  {
    name: "Item Type",
    selector: (row) => row.itemType,
    sortable: true,
  },
  // {
  //   name: "Colors",
  //   selector: (row) => row.colors.join(", "),
  // },
  {
    name: "Description",
    selector: (row) => row.description,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    sortable: true,
  },
  {
    name: "Sizes",
    selector: (row) => row.sizes.join(", "),
  },
  {
    name: "Status",
    selector: (row) => (row.status ? "Active" : "Inactive"),
  },
  {
    name: "Updated At",
    selector: (row) => dateFormatter(row.updatedAt),
    sortable: true,
  },
];

export const orderColumns = [
  {
    name: "#",
    selector: (row, index) => index + 1,
    sortable: true,
    width: "100px",
  },
  {
    name: "Order ID",
    selector: (row) => row.generatedId,
    sortable: true,
  },
  {
    name: "Product",
    selector: (row) => {
      if (row.productName.length == 1) {
        return row.productName[0];
      } else {
        return String(row.productName.length) + " products";
      }
    },
    sortable: true,
  },
  {
    name: "Contact Email",
    selector: (row) => row.customer.customerEmail,
    sortable: true,
  },
  {
    name: "Contact Number",
    selector: (row) => row.customer.address.contactNumber,
    sortable: true,
  },
  // {
  //   name: "Color",
  //   selector: (row) => row.productColor,
  //   sortable: true,
  // },
  {
    name: "Total Amount",
    selector: (row) => row.orderTotalAmount,
    sortable: true,
    width: "130px",
  },
  {
    name: "Status",
    selector: (row) => row.status.statusType,
    sortable: true,
  },
  {
    name: "Order Date",
    selector: (row) => dateFormatter(row.orderDate),
    sortable: true,
  },
];

export const categoryColumns = [
  {
    name: "#",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Category ID",
    selector: (row) => row._id,
    sortable: true,
  },
  {
    name: "Category Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Active",
    selector: (row) => (row.isActive ? "Yes" : "No"),
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => dateFormatter(row.createdAt),
    sortable: true,
  },
  {
    name: "Updated At",
    selector: (row) => dateFormatter(row.updatedAt),
    sortable: true,
  },
];
