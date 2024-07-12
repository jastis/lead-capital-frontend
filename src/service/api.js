import axios from "axios";
import { APP_CONSTANTS } from "../constants/app";

export * from "./routes.constants";

export const baseURL = "https://lead-capital-backend-98hp.onrender.com/api/v1"; //"https://api.leadcapitallogistics.ng/api/v1";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Headers": "Content-Type",
  },
});

const addTokenToRequest = async (req) => {
  const token = sessionStorage.getItem(APP_CONSTANTS.token);
  req.headers.Authorization = `Bearer ${token}`;
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
