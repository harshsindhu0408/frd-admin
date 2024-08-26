import toast from "react-hot-toast";
import { errorNotify, successNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CATEGORIES_APIS } from "../apis";

const addCategory = async (data) => {
  toast.loading("Adding Category...");
  try {
    const response = await makeRequest(
      "POST",
      CATEGORIES_APIS.addCategory,
      data
    );
    toast.dismiss();
    successNotify("Category added Successfully!");
    return response.category;
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default addCategory;
