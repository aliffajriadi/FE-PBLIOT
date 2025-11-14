import axios from 'axios';
import {LoginPayload} from "@/types/login";

export const LoginRequest = async (data: LoginPayload) => {
    const response = await axios.post(
        'http://192.168.1.17:3001/api/auth/login', 
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    );
    return response.data.data;
}