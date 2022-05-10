import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/users/reset_password_confirm/";

export function reset_password_confirm(uid, token, user) {
  return http.post(apiEndpoint, {
    uid: uid,
    token: token,
    new_password: user.new_password,
    re_new_password: user.re_new_password
  });
}
