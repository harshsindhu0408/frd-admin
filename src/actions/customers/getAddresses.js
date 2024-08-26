import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CUSTOMER_APIS } from "../apis";

const getAddresses = async (id) => {
  try {
    const response = await makeRequest(
      "GET",
      CUSTOMER_APIS.getAddresses + `/${id}`
    );
    return response.addresses;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getAddresses;
