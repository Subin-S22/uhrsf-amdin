import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://uhrsf-dev.herokuapp.com/api/v1/uhrsf",
});

export default baseAxios;
