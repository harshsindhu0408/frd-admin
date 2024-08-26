import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { ORDER_APIS } from "../apis";

const getOrder = async (id) => {
  try {
    const data = await makeRequest("GET", ORDER_APIS.getOrder + `/${id}`);
    return data.order;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getOrder;
