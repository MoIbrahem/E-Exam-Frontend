import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/users/me/";
const studentprofileEndPoint = apiUrl + "/exam/students/me/";

export function edit(user) {
  return http.put(apiEndpoint, {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
}

export function editStudent(user) {
  return http.put(studentprofileEndPoint, {
    phone:user.phone,
    birth_date:user.birth_date,
    level:user.level,
    department:user.department
  });
}

