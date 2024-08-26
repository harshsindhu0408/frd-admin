import toast from "react-hot-toast";
import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CATEGORIES_APIS } from "../apis";

const deleteCategory = async (id, navigate) => {
  toast.loading("Deleting category...");
  try {
    await makeRequest("DELETE", CATEGORIES_APIS.deleteCategory + `/${id}`);
    toast.dismiss();
    toast.success("Category deleted successfully");
    navigate(-1);
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default deleteCategory;
