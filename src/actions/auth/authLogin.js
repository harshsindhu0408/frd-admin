import {
  errorNotify,
  successNotify,
} from "../../components/common/CustomToast";
import makeRequest from "../../utils/request";
import { AUTH_APIS } from "../apis";

const authLogin = async ({ email, password }) => {
  try {
    const response = await makeRequest("POST", AUTH_APIS.login, {
      email,
      password,
    });
    successNotify(response.message);
    localStorage.setItem("token", response.token);
    window.location.reload();
  } catch (error) {
    if (error.response) {
      errorNotify(error.response.data.message);
    }
  }
};

export default authLogin;
