import { client } from "./axiosClient";

export const BASE_URL = "https://backend.destructo.workers.dev";


export const signIn = async (payload = {}) => {
  try {
    const response = await client.post(`/api/v1/auth/signin`, payload, {
      authorization: false,
    });
    if (response && response.status === 200) {
      sessionStorage.setItem("access_token", response?.data?.token);
    }
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const signUp = async (payload = {}) => {
  try {
    const response = await client.post(`/api/v1/auth/signup`, payload, {
      authorization: false,
    });
    if (response && response.status === 200) {
      sessionStorage.setItem("access_token", response?.data?.token);
    }
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const getAllBlogs = async (payload = {}) => {
  try {
    const response = await client.get(`/api/v1/blog`, payload);
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const publishBlog = async (payload = {}) => {
  try {
    const response = await client.post(`/api/v1/blog`, payload);
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const getSingleBLog = async (payload = {}) => {};

export const deleteBlog = async (payload = {}) => {};
