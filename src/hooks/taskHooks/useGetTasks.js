import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/tasksApi";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 10000,
  });
};
