import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/auth/jwt/create/";
const tokenKey = "token";

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt.access);
  localStorage.setItem("refresh", jwt.refresh);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("refresh");
}

export async function refreshJwt() {
  const refToken = localStorage.getItem("refresh");
  const { data: jwt } = await http.post(apiUrl + "/auth/jwt/refresh/", {
    refresh: refToken,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  refreshJwt,
};
