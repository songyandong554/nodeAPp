import { httpRequest } from "../utils/http";

// 定义接口返回数据类型
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// API 接口封装
export const userApi = {
  // 获取用户列表
  getUserList(): Promise<ApiResponse<User[]>> {
    return httpRequest.get("/users");
  },

  // 获取用户详情
  getUserById(id: number): Promise<ApiResponse<User>> {
    return httpRequest.get(`/users/${id}`);
  },

  // 创建用户
  createUser(userData: Omit<User, "id">): Promise<ApiResponse<User>> {
    return httpRequest.post("/users", userData);
  },

  // 更新用户
  updateUser(id: number, userData: Partial<User>): Promise<ApiResponse<User>> {
    return httpRequest.put(`/users/${id}`, userData);
  },

  // 删除用户
  deleteUser(id: number): Promise<ApiResponse<null>> {
    return httpRequest.delete(`/users/${id}`);
  },
  getTest() {
    return httpRequest.get("/test");
  },
};
