import { AxiosResponse } from "axios";
import { PostType } from "@repo/common/config";
import { client } from "./axiosClient";
import { ApiResponse } from "@/lib/types";

export const signIn = async (payload = {}) => {
  try {
    const response = await client.post(`/api/v1/auth/signin`, payload, {
      authorization: false,
    });
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

export const publishBlog = async (
  payload = {},
  post_id = "",
  is_update = false
) => {
  try {
    let response;
    if (is_update) {
      response = await client.put(`/api/v1/blog/auth/${post_id}`, payload);
    } else {
      response = await client.post(`/api/v1/blog/auth/`, payload);
    }
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const getSingleBlog = async (
  id = ""
): Promise<AxiosResponse<ApiResponse<PostType>> | undefined> => {
  try {
    const response = await client.get(`/api/v1/blog/${id}`);
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const deleteBlog = async (id = "") => {
  try {
    const response = await client.delete(`/api/v1/blog/auth/${id}`);
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const likeBlog = async (postId = "", userId: "", like_count = 1) => {
  try {
    const response = await client.post(`/api/v1/blog/auth/like-post`, {
      postId,
      userId,
      like_count,
    });
    return response;
  } catch (err) {
    //Show error toast
  }
};
