import { axiosInstance } from "../utils/axios";

const initializeAuth = async () => {
  console.log(import.meta.env.VITE_BACKEND_URL);
  const { data } = await axiosInstance.get("/auth/is-authenticated");
  return data;
};

const register = async (name, email, password) => {
  const { data } = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

const verifyEmail = async (otp) => {
  const { data } = await axiosInstance.post("/auth/verify-email", { otp });
  return data;
};

const login = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};

const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

export { initializeAuth, register, verifyEmail, login, logout };
