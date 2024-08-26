import toast from "react-hot-toast";
import {
  errorNotify,
  successNotify,
} from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { PRODUCT_APIS } from "../apis";

const addProduct = async (formData, navigate) => {
  toast.loading("adding product...");
  try {
    const res = await makeRequest(
      "POST",
      PRODUCT_APIS.addProduct,
      formData,
      null,
      {
        "Content-Type": "multipart/form-data", // Specify content type as multipart/form-data
      }
    );

    toast.dismiss();
    successNotify(res.message);
    navigate(`/products/${res.addNewProduct._id}`);
  } catch (error) {
    toast.dismiss();
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default addProduct;
