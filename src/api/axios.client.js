import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://topjob-api.onrender.com/api/v1/",
});

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use((response) => response);

export default axiosClient;
