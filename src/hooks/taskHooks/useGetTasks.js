import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/tasksApi";
import { useTasksStore } from "../../store/tasks-store";
import toast from "react-hot-toast";

export const useGetTasks = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 10000,
    onError: (error) => {
      toast.error(error?.msg || "Error");
    },
  });
};
