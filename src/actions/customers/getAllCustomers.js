import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CUSTOMER_APIS } from "../apis";

const getAllCustomers = async () => {
  try {
    const response = await makeRequest("GET", CUSTOMER_APIS.getAllCustomers);
    return response.customers;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getAllCustomers;
