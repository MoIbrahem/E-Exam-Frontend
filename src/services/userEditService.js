import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/users/me/";

export function edit(user) {
  return http.put(apiEndpoint, {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
}
