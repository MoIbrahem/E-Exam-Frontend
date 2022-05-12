import axios from "axios";
import logger from "./logService";
import { getJwt } from "./authService";
import { toast } from "react-toastify";

// axios.defaults.headers.common["Authorization"] =
//   "JWT " + localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] =
  "JWT " + getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
