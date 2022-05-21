import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/users/reset_password/";

export function reset_password(user) {
  return http.post(apiEndpoint, {
    email: user.email,
  },{headers:{Authorization:""}});
}
