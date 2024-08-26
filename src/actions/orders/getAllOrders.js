import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { ORDER_APIS } from "../apis";

const getAllOrders = async () => {
  try {
    const data = await makeRequest("GET", ORDER_APIS.getAllOrders);
    const sortedOrders = data.order.sort((a, b) => {
      return new Date(b.orderDate) - new Date(a.orderDate);
    });
    return sortedOrders;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
    return [];
  }
};

export default getAllOrders;
