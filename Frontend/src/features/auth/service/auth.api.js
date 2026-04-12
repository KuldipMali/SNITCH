// In this file, we call the API from the backend
import axios from "axios";

const authAPI = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export async function register({
  email,
  contact,
  password,
  fullname,
  isSeller,
}) {
  const response = await authAPI.post("/register", {
    email,
    contact,
    password,
    fullname,
    isSeller,
  });

  return response.data;
}

export async function login({ email, password }) {
  const response = await authAPI.post("/login", { email, password });

  return response.data;
}
