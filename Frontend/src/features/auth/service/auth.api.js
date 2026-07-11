// In this file, we call the API from the backend
import axios from "axios";

const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
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

export async function getMe() {
  const response = await authAPI.get("/me");
  return response.data;
}
