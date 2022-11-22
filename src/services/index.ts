import axios from "axios";
import { toast } from "react-toastify";

const baseAxios = axios.create({
  baseURL: "https://uhrsf-dev.herokuapp.com/api/v1/uhrsf",
});

// Add a request interceptor
baseAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    toast.info("Loading...");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
baseAxios.interceptors.response.use(
  function (response) {
    toast.success("Successfull");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    toast.error("Failed");
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default baseAxios;
