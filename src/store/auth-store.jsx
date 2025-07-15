import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  setUser: (userData) => set({ user: userData }),
}));

// import { create } from "zustand";
// import { axiosInstance } from "../utils/axios";

// export const useAuthStore = create((set) => ({
//   isLoggedIn: false,
//   setIsLoggedIn: (value) => set({ isLoggedIn: value }),
//   user: null,
//   setUser: (userData) => set({ user: userData }),
//   initializeAuth: async () => {
//     try {
//       const { data } = await axiosInstance.get("/auth/is-authenticated");
//       set({ isLoggedIn: true, user: data });
//     } catch (error) {
//       set({ isLoggedIn: false, user: null });
//     }
//   },
//   register: async (name, email, password) => {
//     console.log("Register function called with:", { name, email, password });
//     try {
//       console.log("About to make API call");
//       const { data } = await axiosInstance.post("/auth/register", {
//         name,
//         email,
//         password,
//       });
//       console.log("API call successful:", data);
//       set({ isLoggedIn: true });
//       return data;
//     } catch (error) {
//       console.log("API call failed:", error);
//       throw error;
//     }
//   },
//   login: async (email, password) => {
//     console.log("Login function called with:", { email, password });

//     try {
//       console.log("About to make API call");
//       const { data } = await axiosInstance.post("/auth/login", {
//         email,
//         password,
//       });
//       console.log("API call successful:", data);
//       set({ isLoggedIn: true, user: data.user });
//     } catch (error) {
//       console.log("API call failed:", error);
//       throw error;
//     }
//   },
//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ isLoggedIn: false, user: null });
//     } catch (error) {
//       throw error;
//     }
//   },
// }));
