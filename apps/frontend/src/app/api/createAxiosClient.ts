import axios from "axios";

export function createAxiosClient({ options }: any) {
  const client = axios.create(options);

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
