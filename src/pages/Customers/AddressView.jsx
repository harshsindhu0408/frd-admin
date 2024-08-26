import React from "react";
import getAddresses from "../../actions/customers/getAddresses";
import dateFormatter from "../../utils/dateFormatter";

const AddressView = ({ id }) => {
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    // get customer addresses
    getAddresses(id).then((res) => {
      setAddresses(res);
    });
  }, []);

  return (
    <>
      {/* header */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-4 text-gray-900">
          Addresses
        </h3>
      </div>

      {/* addresses */}
      {addresses.length > 0 ? (
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {addresses.map((address, index) => (
            <div key={address._id}>
              {/* address id */}
              <h1 className="px-4 sm:px-6 mt-2 font-bold">
                Address {index + 1}
              </h1>

              {/* address details */}
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Address Line 1
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.addressLine1}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                  Address Line 2
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.addressLine2}
                </dd>
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.city}
                </dd>
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.state}
                </dd>
                <dt className="text-sm font-medium text-gray-500">Zipcode</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.zipcode}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                  Contact Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.contactNumber}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                  Contact Person
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {address.contactPerson}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                  Created at
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {dateFormatter(address.createdAt)}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                  Updated at
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {dateFormatter(address.updatedAt)}
                </dd>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-gray-200">
          <div className="h-36 flex items-center justify-center text-lg font-bold">
            No addresses found
          </div>
        </div>
      )}
    </>
  );
};

export default AddressView;
