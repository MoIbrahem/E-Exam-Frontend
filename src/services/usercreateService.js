import { apiUrl } from "../config.json";
import axios from "axios";

const apiEndpoint = apiUrl + "/auth/users/";


export function register(user) {
    return axios.post(apiEndpoint,{
      username: user.username,
      password: user.password,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_type: user.profile_type,
    },{headers:{Authorization:""}});
  }