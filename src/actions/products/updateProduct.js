import toast from "react-hot-toast";
import {
  errorNotify,
  successNotify,
} from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { PRODUCT_APIS } from "../apis";

const updateProduct = async (data, id) => {
  toast.loading("Updating product...");
  try {
    const res = await makeRequest(
      "PUT",
      PRODUCT_APIS.updateProduct + `/${id}`,
      data,
      null,
      {
        "Content-Type": "multipart/form-data", // Specify content type as multipart/form-data
      }
    );
    toast.dismiss();
    successNotify("Succefully updated!");
    return res.updatedProduct;
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default updateProduct;
