import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { PRODUCT_APIS } from "../apis";

const getProduct = async (id) => {
  try {
    const res = await makeRequest("GET", PRODUCT_APIS.getProduct + `/${id}`);
    return res.product;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getProduct;
