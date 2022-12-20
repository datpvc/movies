import axios from "axios";
import { store } from "../index.js";
import { setIsLoading } from "../redux/reducer/spinnerSlice.js";
import { userInfoLocal } from "./local.service.js";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzM0UiLCJIZXRIYW5TdHJpbmciOiIxOS8wNC8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODE4NjI0MDAwMDAiLCJuYmYiOjE2NTQzNjIwMDAsImV4cCI6MTY4MjAxMDAwMH0.8vVBHKZZpOpTUa6ep4mWe7SQc5U-y_8IFYOnVCJLEgI";

const BASE_URL = "https://movienew.cybersoft.edu.vn";

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "bearer " + userInfoLocal.get()?.accessToken,
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // On Loadindg
    store.dispatch(setIsLoading(true));
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Off Loading
    store.dispatch(setIsLoading(false));
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(setIsLoading(false));
    return Promise.reject(error);
  }
);
