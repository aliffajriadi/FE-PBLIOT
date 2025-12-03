import {api} from '../axios';
import {LoginPayload} from "@/types/login";
import { CreateUserPayload} from "@/types/user";


export const LoginRequest = (data: LoginPayload) =>
  api.post("/auth/login", data, {withCredentials: true}).then(res => {
       return res.data.data;
     });

export const LogoutRequest = () =>
  api.post("/auth/logout").then(res => res.data);

export const createUser = async (payload: CreateUserPayload) => {
  const res = await api.post("/user", payload, { withCredentials: true });
  return res.data.data;
};

export const getUsers = async () => {
  const res = await api.get("/user", { withCredentials: true });
  return res.data.data;
};

export const getUserById = async (id: number) => {
  const res = await api.get(`/user/${id}`, { withCredentials: true });
  return res.data.data;
};

export const updateUser = async (id: number, data: Partial<CreateUserPayload>) => {
  const res = await api.put(`/user/${id}`, data, { withCredentials: true });
  return res.data.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/user/${id}`, { withCredentials: true });
  return res.data.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/user/profile/me", { withCredentials: true });
  return res.data.data; 
};
