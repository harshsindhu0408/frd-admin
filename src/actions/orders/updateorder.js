import toast from "react-hot-toast";
import {
  errorNotify,
  successNotify,
} from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { ORDER_APIS } from "../apis";

const updateOrder = async (id, data) => {
  toast.loading("Updating order...");
  try {
    const res = await makeRequest(
      "PUT",
      ORDER_APIS.updateOrder + `/${id}`,
      data
    );
    toast.dismiss();
    successNotify("Order Updated Successfully!");
    return res.updatedOrder;
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default updateOrder;
