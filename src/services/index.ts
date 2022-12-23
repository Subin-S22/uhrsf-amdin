import axios from "axios";
import { toast } from "react-toastify";

const baseAxios = axios.create({
  baseURL: "http://mahasamrudhi.com/uhrsf_dev/api/v1/uhrsf",
});

// Add a request interceptor
baseAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    toast.dismiss();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default baseAxios;
