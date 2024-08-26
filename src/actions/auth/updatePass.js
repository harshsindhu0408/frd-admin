import {
  errorNotify,
  successNotify,
} from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { AUTH_APIS } from "../apis";

const updatePass = async (newPassData) => {
  try {
    const response = await makeRequest(
      "PUT",
      AUTH_APIS.updatePassword,
      newPassData
    );
    successNotify(response.message);
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
    throw error;
  }
};

export default updatePass;
