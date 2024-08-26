import axios from "axios";
import { errorNotify } from "../components/common/CustomToast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const makeRequest = async (
  method,
  url,
  data = {},
  params = null,
  headers = {}
) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: data,
      params: params,
      headers: { ...axiosInstance.defaults.headers, ...headers }, // Merge default headers with additional headers
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }

    if (error.code === "ERR_NETWORK") {
      errorNotify("Server: " + error.message);
    }
    throw error;
  }
};

export default makeRequest;
