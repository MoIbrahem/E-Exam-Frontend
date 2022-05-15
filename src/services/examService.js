import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/exam/exams/";
const levelEndpoint = apiUrl + "/exam/levels/";

function ExamUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getExamStatus() {
  return http.get(apiEndpoint);
}

export function getExam(examId) {
  return http.get(ExamUrl(examId));
}
export function getLevel() {
  return http.get(levelEndpoint);
}
