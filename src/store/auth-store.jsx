import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  isLoading: true,
  initializeAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/is-authenticated");
      set({ isLoggedIn: true, user: data.user, isLoading: false });
    } catch (error) {
      set({ isLoggedIn: false, user: null, isLoading: false });
    }
  },
  register: async (name, email, password) => {
    console.log("Register function called with:", { name, email, password });
    try {
      console.log("About to make API call");
      const { data } = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log("API call successful:", data);
      set({ isLoggedIn: true, isLoading: false });
      return data;
    } catch (error) {
      console.log("API call failed:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  login: async (email, password) => {
    console.log("Login function called with:", { email, password });

    try {
      console.log("About to make API call");
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("API call successful:", data);
      set({ isLoggedIn: true, user: data.user, isLoading: false });
    } catch (error) {
      console.log("API call failed:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ isLoggedIn: false, user: null });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
