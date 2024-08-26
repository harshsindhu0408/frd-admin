import toast from "react-hot-toast";
import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { CUSTOMER_APIS } from "../apis";

const deleteCustomer = async (id,navigate) => {
  toast.loading("Deleting customer...");
  try {
    await makeRequest("DELETE", CUSTOMER_APIS.deleteCustomer + `/${id}`);
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

export default deleteCustomer;
