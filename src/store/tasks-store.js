import { create } from "zustand";

export const useTasksStore = create((set) => ({
  tasks: null,
  setTasks: (tasks) => set({ tasks }),
  currentSort: "Active",
  setCurrentSort: (val) => set({ currentSort: val }),
}));
