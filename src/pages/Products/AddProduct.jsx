import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import addProduct from "../../actions/products/addProduct";
import getAllCategories from "../../actions/categories/getAllCategories";
import TagView from "../../components/common/TagView";

const AddProduct = () => {
  const [categoryOptions, setCategoryOptions] = React.useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    itemType: "",
    sizes: [],
    colors: [],
    quantity: 0,
    status: true,
    thumbnailImage: null, // Add this line to store the image file
  });
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const navigate = useNavigate();

  // form submit
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("itemType", productData.itemType);
    formData.append("sizes", productData.sizes);
    formData.append("colors", productData.colors);
    formData.append("quantity", productData.quantity);
    formData.append("status", productData.status);
    formData.append("thumbnailImage", productData.thumbnailImage); // Append the image file here
    addProduct(formData, navigate);
  }

  // handle image change
  function handleImageChange(e) {
    setProductData({ ...productData, thumbnailImage: e.target.files[0] });
  }

  // get categoryOptions
  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategoryOptions(categories);
    });
  }, []);

  return (
    <Layout>
      {/* page header */}
      <div className="mx-4 mt-3">
        <BackButton onClick={() => navigate("/products")} />
      </div>

      {/* form */}
      <form
        className="flex flex-col py-4 mx-4 gap-2"
        onSubmit={handleFormSubmit}
      >
        {/* form heading */}
        <h1 className="ms-1 font-bold text-2xl border-b border-1">
          Add Product
        </h1>

        {/* inputs */}
        <CustomInput
          label="Name"
          placeholder="Enter product name"
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
          required
        />

        {/* Price */}
        <CustomInput
          type="number"
          min={0}
          label="Price (in dollars)"
          placeholder="Enter price"
          value={productData.price}
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
          required
        />

        {/* Description */}
        <CustomInput
          label="Description"
          placeholder="Enter description"
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          required
        />

        {/* Category */}
        <div className="ms-1">
          <label className="text-gray-700">
            Category
            <span className="text-red-500 required-dot">*</span>
          </label>
          <select
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            value={productData.category} // Use value prop for controlled component
            className={`cursor-pointer rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
          >
            <option value="" disabled>
              Select category...
            </option>
            {categoryOptions &&
              categoryOptions.map((option, index) => (
                <option key={index} value={option._id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>

        {/* Item Type */}
        <CustomInput
          label="Item Type"
          placeholder="Enter item type (cloth type - Cotton, nylon, etc...)"
          value={productData.itemType}
          onChange={(e) =>
            setProductData({ ...productData, itemType: e.target.value })
          }
          required
        />

        {/* Sizes */}
        <TagView
          handleRemoveItem={(idx) => {
            productData.sizes.splice(idx, 1);
            setProductData({ ...productData, sizes: [...productData.sizes] });
          }}
          values={productData.sizes}
        >
          <div className="flex flex-row w-full">
            <div className="w-[80%]">
              <CustomInput
                value={currentSize}
                onChange={(e) => setCurrentSize(e.target.value)}
                label="Sizes"
                placeholder="Enter size"
              />
            </div>

            {/* add new size button */}
            <div
              onClick={() => {
                setProductData({
                  ...productData,
                  sizes: [...productData.sizes, currentSize],
                });
                setCurrentSize(""); // Clear the input field directly here
              }}
              className="w-[20%] mt-6 mx-1"
            >
              <CustomButton className="w-full">Add Size</CustomButton>
            </div>
          </div>
        </TagView>

        {/* Colors */}
        <TagView
          handleRemoveItem={(idx) => {
            productData.colors.splice(idx, 1);
            setProductData({ ...productData, colors: [...productData.colors] });
          }}
          values={productData.colors}
        >
          <div className="flex flex-row w-full">
            <div className="w-[80%]">
              <CustomInput
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                label="Colors"
                placeholder="Enter color"
              />
            </div>

            {/* add new color button */}
            <div
              onClick={() => {
                setProductData({
                  ...productData,
                  colors: [...productData.colors, currentColor],
                });
                setCurrentColor(""); // Clear the input field directly here
              }}
              className="w-[20%] mt-6 mx-1"
            >
              <CustomButton className="w-full">Add Color</CustomButton>
            </div>
          </div>
        </TagView>

        {/* Quantity */}
        <CustomInput
          type="number"
          min={0}
          label="Quantity"
          placeholder="Enter quantity"
          value={productData.quantity}
          onChange={(e) =>
            setProductData({ ...productData, quantity: e.target.value })
          }
          required
        />

        {/* status */}
        <div className="ms-1">
          <label className="text-gray-700">
            Status
            <span className="text-red-500 required-dot">*</span>
          </label>
          <select
            value={productData.status}
            onChange={(e) =>
              setProductData({ ...productData, status: e.target.value })
            }
            className={`cursor-pointer rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
          >
            <option value={true}>Active</option>
            <option value={false}>Not active</option>
          </select>

          {/* Product Image */}
          <div className="mt-2">
            <label className="text-gray-700">
              Product Image
              <span className="text-red-500 required-dot">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* submit button */}
        <div className="flex justify-center mt-1">
          <CustomButton
            onClick={() => navigate(-1)}
            className="bg-orange-500 hover:bg-orange-400"
          >
            Cancel
          </CustomButton>

          <CustomButton type="submit" className="w-36">
            Add
          </CustomButton>
        </div>
      </form>
    </Layout>
  );
};

export default AddProduct;
