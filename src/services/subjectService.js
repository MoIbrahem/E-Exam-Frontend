import http from "./httpService";
import { apiUrl } from "../config.json";

const subjectEndpoint = apiUrl + "/exam/subjects/";

export function getSubject() {
  return http.get(subjectEndpoint);
}
