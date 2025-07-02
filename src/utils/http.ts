import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// 创建 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api", // 基础URL，可以通过环境变量配置
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里添加 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 显示加载状态
    console.log("请求开始", config);

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error("请求错误", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    console.log("响应成功", response);

    // 统一处理响应数据
    const { data, status } = response;

    if (status === 200) {
      return data;
    }

    return response;
  },
  (error) => {
    // 对响应错误做点什么
    console.error("响应错误", error);

    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          console.error("没有权限访问");
          break;
        case 404:
          console.error("请求的资源不存在");
          break;
        case 500:
          console.error("服务器内部错误");
          break;
        default:
          console.error(`请求失败: ${data?.message || "未知错误"}`);
      }
    } else if (error.request) {
      console.error("网络错误，请检查网络连接");
    } else {
      console.error("请求配置错误", error.message);
    }

    return Promise.reject(error);
  }
);

// 封装常用的请求方法
export const httpRequest = {
  // GET 请求
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.get(url, config);
  },

  // POST 请求
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return http.post(url, data, config);
  },

  // PUT 请求
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return http.put(url, data, config);
  },

  // DELETE 请求
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.delete(url, config);
  },

  // PATCH 请求
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return http.patch(url, data, config);
  },

  // 上传文件
  upload<T = any>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    return http.post(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
  },
};

// 导出 axios 实例，以便在需要时直接使用
export default http;
