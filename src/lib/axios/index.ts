import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.1.10:3000/api', // tinggal ganti di .env
  withCredentials: true, // kalau pakai cookie
});
