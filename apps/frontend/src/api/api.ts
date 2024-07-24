import axios from "axios";
import { client } from "./axiosClient";

export const BASE_URL = "https://backend.destructo.workers.dev";

const config = { authorization: true };

export const publishArticle = async (payload = {}) => {
  try {
    const response = await client.post(`/api/v1/blog`, payload, {
      ...config,
    });
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const signIn = async (payload={}) => {
  try {
    const response = await client.post(`/api/v1/auth/signin`, payload, {authorization: false});
    if(response && response.status === 200){
        sessionStorage.setItem("access_token", response?.data?.token);
    }
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const signUp = async (payload={}) => {
  try {
    const response = await client.post(`/api/v1/auth/signup`, payload, {authorization: false});
    return response;
  } catch (err) {
    //Show error toast
  }
};