import { errorNotify } from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { AUTH_APIS } from "../apis";

const getProfile = async () => {
  try {
    const response = await makeRequest("GET", AUTH_APIS.getProfile);
    return response.admin;
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default getProfile;
