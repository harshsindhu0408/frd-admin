import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import getAllCustomers from "../../actions/customers/getAllCustomers";
import { customerColumns } from "../../utils/table_columns";
import CustomTable from "../../components/common/CustomTable/CustomTable";
import TableFilter from "./TableFilter";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  // state for filters
  const [gender, setGenderFilter] = useState("all");
  const [search, setSearchFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    // get customers from server
    getAllCustomers()
      .then((customers) => {
        setCustomers(customers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  // handle proccess on row click
  function handleRowClicked(row) {
    navigate(`/customers/${row._id}`);
  }

  return (
    <Layout>
      <div className="p-4">
        {/* customers table */}
        <CustomTable
          header={
            <TableFilter
              setSearch={setSearchFilter}
              setGender={setGenderFilter}
              gender={gender}
              search={search}
            />
          }
          onRowClicked={(row) => handleRowClicked(row)}
          title="Customers"
          loading={loading}
          columns={customerColumns}
          data={
            customers &&
            customers.filter((customer) => {
              // Apply filters
              const nameMatches = customer.name
                .toLowerCase()
                .includes(search.toLowerCase());
              const emailMatches = customer.email
                .toLowerCase()
                .includes(search.toLowerCase());
              const genderMatches =
                gender === "all" || customer.gender === gender;
              return (
                (nameMatches && genderMatches) ||
                (emailMatches && genderMatches)
              );
            })
          }
        />
      </div>
    </Layout>
  );
};

export default Customers;
