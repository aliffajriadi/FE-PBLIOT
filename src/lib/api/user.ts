import {api} from '../axios';
import {LoginPayload} from "@/types/login";


export const LoginRequest = (data: LoginPayload) =>
  api.post("/auth/login", data).then(res => {
       return res.data.data;
     });

export const LogoutRequest = () =>
  api.post("/auth/logout").then(res => res.data);