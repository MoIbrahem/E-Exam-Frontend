import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/exam/exams/";
const levelEndpoint = apiUrl + "/exam/levels/";

export function getExamStatus() {
  return http.get(apiEndpoint);
}

export function getLevel() {
  return http.get(levelEndpoint);
}
