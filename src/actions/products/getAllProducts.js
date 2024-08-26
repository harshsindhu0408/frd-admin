import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { PRODUCT_APIS } from "../apis";

const getAllProducts = async () => {
  try {
    const data = await makeRequest("GET", PRODUCT_APIS.getAllProducts);
    return data.products;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getAllProducts;
