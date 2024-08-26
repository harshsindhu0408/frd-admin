import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import getCustomer from "../../actions/customers/getCustomer";
import Loader from "../../components/common/Loader";
import BackButton from "../../components/common/BackButton";
import AddressView from "./AddressView";
import CustomButton from "../../components/common/CustomButton";
import deleteCustomer from "../../actions/customers/deleteCustomer";

const UserView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = React.useState();
  const [loading, setLoading] = React.useState(true); // State to manage loading
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  React.useEffect(() => {
    getCustomer(id).then((res) => {
      setCustomer(res);
      setLoading(false); // Set loading to false when data is fetched
    });
  }, []);

  function handleDeleteUser() {
    setShowConfirmation(true);
  }

  function confirmDeleteUser() {
    deleteCustomer(id, navigate);
  }

  function cancelDeleteUser() {
    setShowConfirmation(false);
  }

  return (
    <Layout>
      {/* header */}
      <div className="mx-4 mt-3">
        <BackButton onClick={() => navigate(-1)} />
      </div>

      {loading ? ( // Conditional rendering based on loading state
        <Loader />
      ) : customer ? (
        <>
          {/* customer details */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-4 mt-2">
            {/* customer name & id --header */}
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {customer.name}
                </h3>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  #{customer._id}
                </p>
              </div>

              {/* delete button */}
              <CustomButton
                onClick={handleDeleteUser}
                className="bg-red-500 hover:bg-red-400"
              >
                Delete
              </CustomButton>
            </div>

            {/* about */}
            <div className="border-t border-gray-200">
              <dl>
                {/* email */}
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {customer.email}
                  </dd>
                </div>
                {/* gender */}
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {customer.gender}
                  </dd>
                </div>
                {/* Date of birth */}
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">DOB</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {customer.dob}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Created at
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {customer.createdAt}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Updated at
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {customer.updatedAt}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* address view */}
          <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-4 mt-2">
            <AddressView id={id} />
          </div>

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
                          Delete Customer
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this customer? This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={confirmDeleteUser}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={cancelDeleteUser}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p>No customer found!</p>
          <CustomButton onClick={() => navigate("/customers")}>
            View All Customers
          </CustomButton>
        </div>
      )}
    </Layout>
  );
};

export default UserView;
