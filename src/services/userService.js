import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/users/";
const changepasswordEndPoint = apiUrl + "/auth/users/set_password/";
const profileEndPoint = apiUrl + "/auth/users/me";
const studentprofileEndPoint = apiUrl + "/exam/students/me";

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

export function setpassword(user) {
  return http.post(changepasswordEndPoint, {
    new_password: user.new_password,
    re_new_password: user.re_new_password,
    current_password:user.current_password
  });
}

export function getUser() {
  return http.get(profileEndPoint);
}

export function getStusent() {
  return http.get(studentprofileEndPoint);
}
