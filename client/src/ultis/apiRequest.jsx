import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://allure-5atl.onrender.com/api/",

  withCredentials: true,
});
export default apiRequest;
