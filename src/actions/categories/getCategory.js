import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CATEGORIES_APIS } from "../apis";

const getCategory = async (id) => {
  try {
    const response = await makeRequest(
      "GET",
      CATEGORIES_APIS.getCategory + `/${id}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getCategory;
