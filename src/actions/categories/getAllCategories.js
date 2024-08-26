import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CATEGORIES_APIS } from "../apis";

const getAllCategories = async () => {
  try {
    const response = await makeRequest("GET", CATEGORIES_APIS.getAllCategories);
    return response.categories;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getAllCategories;
