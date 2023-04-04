import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://allure-api-kpi8.onrender.com/api/",

  withCredentials: true,
});
export default apiRequest;
