import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CUSTOMER_APIS } from "../apis";

const getCustomer = async (id) => {
  try {
    const response = await makeRequest(
      "GET",
      CUSTOMER_APIS.getCustomer + `/${id}`
    );
    return response.customer;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getCustomer;
