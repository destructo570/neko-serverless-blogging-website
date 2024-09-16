import { isDevEnvironment } from "@/lib/utils";
import {
  AdaptAxiosRequestConfig,
  createAxiosClient,
} from "./createAxiosClient";
import { AxiosHeaders } from "axios";

// const BASE_URL = "http://localhost:3001";
// const BASE_URL = "https://backend.destructo.workers.dev";
const BASE_URL = isDevEnvironment
  ? "http://localhost:3001"
  : "https://backend.destructo.workers.dev";

function getCurrentAccessToken() {
  return sessionStorage.getItem("access_token");
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getCurrentAccessToken,
});

export const getAxiosConfig = (authorization = false, headers={}) => {
  const config: AdaptAxiosRequestConfig = {
    authorization,
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
      ...headers,
    }),
  };
  return config;
};
