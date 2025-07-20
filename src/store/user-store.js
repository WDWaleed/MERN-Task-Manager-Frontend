import { create } from "zustand";

export const useUserStore = create((set) => ({
  userData: {},
  setUserData: (fetchedUserData) => set({ userData: fetchedUserData }),
  theme: "",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
