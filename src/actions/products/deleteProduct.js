import toast from "react-hot-toast";
import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { PRODUCT_APIS } from "../apis";

const deleteProduct = async (id, navigate) => {
  toast.loading("Deleting product...");
  try {
    await makeRequest("DELETE", PRODUCT_APIS.deleteProduct + `/${id}`);
    toast.dismiss();
    toast.success("Customer deleted successfully");
    navigate(-1);
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default deleteProduct;
