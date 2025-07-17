import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userData: {},
  setUserData: (fetchedUserData) => set({ userData: fetchedUserData }),
}));
