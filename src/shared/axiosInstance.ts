import { getFromCookie } from "@/utiles/Cookie";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: any = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export { instance };
