import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Extend AxiosInstance to include your custom methods
interface CustomAxiosInstance extends AxiosInstance {
  Get: (options: any) => Promise<any>;
  Post: (options: any) => Promise<any>;
  Put: (options: any) => Promise<any>;
  Delete: (options: any) => Promise<any>;
}

const Api = axios.create({
  baseURL: "https://app.backend.workotick.com/api/v1",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 60,
}) as CustomAxiosInstance;

// Request interceptor
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Custom methods
Api.Get = async (url: string, params: string, config: any = {}) => {
  const { data } = await Api.get(url, { params, ...config });
  return data;
};

Api.Post = async (url: string, postData: string, config: any = {}) => {
  const { data } = await Api.post(url, postData, config);
  return data;
};

Api.Put = async (url: string, putData: string, config: any = {}) => {
  const { data } = await Api.put(url, putData, config);
  return data;
};

Api.Delete = async (url: string, config: any = {}) => {
  const { data } = await Api.delete(url, config);
  return data;
};

export default Api;
