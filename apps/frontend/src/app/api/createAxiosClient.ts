import axios from "axios";

export function createAxiosClient({ options, getCurrentAccessToken}: any) {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {      
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 || error.response?.status === 403) {
        //Todo: Show unauthorized error here
      }
      return Promise.reject(error);
    }
  );

  return client;
}
