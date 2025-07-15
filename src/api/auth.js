import { axiosInstance } from "../utils/axios";

const initializeAuth = async () => {
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

export { initializeAuth, register };
