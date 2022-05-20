import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/exam/exams/";
const levelEndpoint = apiUrl + "/exam/levels/";
const examQuestion = apiUrl + "/exam/examquestions/";
const correctAnswerEndpoint = apiUrl + "/exam/rightanswers/";

function ExamUrl(id) {
  return `${apiEndpoint}${id}/`;
}

export function getExamStatus() {
  return http.get(apiEndpoint);
}

export function getExam(examId) {
    return http.get(ExamUrl(examId));
}

export function getExamQuestion(examId){
  return http.post(examQuestion, {
    exam__id: examId
  })
}

export function getLevel() {
  return http.get(levelEndpoint);
}

export function answerSubmit(submit) {
  return http.post(correctAnswerEndpoint,{
    exam__id: submit.exam__id,
    student_answer: submit.student_answer,
    
  });
}
