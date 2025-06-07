import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://app.wewantwaste.co.uk/api",
});

export default axiosInstance;
