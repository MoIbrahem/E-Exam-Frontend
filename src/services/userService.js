import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/users/";
const profileEndPoint = apiUrl + "/auth/users/me";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    profile_type: user.profile_type,
  });
}
export function getUser() {
  return http.get(profileEndPoint);
}
