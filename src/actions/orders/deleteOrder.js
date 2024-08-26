import toast from "react-hot-toast";
import {
  errorNotify,
  successNotify,
} from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { ORDER_APIS } from "../apis";

const deleteOrder = async (id, navigate) => {
  toast.loading("Deleting order...");
  try {
    await makeRequest("DELETE", ORDER_APIS.deleteOrder + `/${id}`);
    toast.dismiss();
    successNotify("Order Deleted Successfully!");
    navigate(-1);
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default deleteOrder;
