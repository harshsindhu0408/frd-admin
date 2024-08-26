import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import BackButton from "../../components/common/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import getProduct from "../../actions/products/getProduct";
import updateProduct from "../../actions/products/updateProduct";
import deleteProduct from "../../actions/products/deleteProduct";
import Loader from "../../components/common/Loader";
import getAllCategories from "../../actions/categories/getAllCategories";
import TagView from "../../components/common/TagView";

const ProductView = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryOptions, setCategoryOptions] = React.useState(null);
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then((product) => {
      product.category = product.category._id;
      setProductData(product);
    });
  }, []);

  function handleFormUpdate(e) {
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
    formData.append("thumbnailImage", productData.thumbnailImage);

    // call api
    updateProduct(formData, id).then((updatedProduct) => {
      updatedProduct.category = updatedProduct.category._id;
      setProductData(updatedProduct);
    });
  }

  function handleDeleteProduct() {
    setShowConfirmation(true);
  }

  function confirmDeleteProduct() {
    deleteProduct(id, navigate);
  }

  function cancelDeleteProduct() {
    setShowConfirmation(false);
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
      <div className="mx-4 mt-3">
        <BackButton onClick={() => navigate("/products")} />
      </div>

      {productData ? (
        <form
          className="flex flex-col py-4 mx-4 gap-2"
          onSubmit={handleFormUpdate}
        >
          <div className="flex justify-between ms-1">
            <h1 className="font-bold text-2xl border-b border-1">
              Update Product
            </h1>

            <CustomButton
              type="button"
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-400"
            >
              Delete
            </CustomButton>
          </div>

          {/* Image container */}
          <div
            className="w-full flex items-center justify-center h-44 overflow-hidden"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            {/* Image */}
            <img
              src={productData && productData.img}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* name */}
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
            label="Price"
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
              value={
                productData && productData.category ? productData.category : ""
              }
              // Ensure a default value is set when productData or productData.category is null
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
              setProductData({ ...productData });
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
                  productData.sizes.push(currentSize);
                  setProductData({ ...productData });
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
              setProductData({ ...productData });
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

              {/* add new size button */}
              <div
                onClick={() => {
                  productData.colors.push(currentColor);
                  setProductData({ ...productData });
                  setCurrentColor(""); // Clear the input field directly here
                }}
                className="w-[20%] mt-6 mx-1"
              >
                <CustomButton className="w-full">Add Size</CustomButton>
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

          {/* Status */}
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
          </div>

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
            />
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
              Update
            </CustomButton>
          </div>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Delete Product
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this product? This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={confirmDeleteProduct}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={cancelDeleteProduct}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      ) : (
        <>
          <Loader />
        </>
      )}
    </Layout>
  );
};

export default ProductView;
