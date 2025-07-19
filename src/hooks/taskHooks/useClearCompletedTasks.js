import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { clearCompletedTasks } from "../../api/tasksApi";
import { useTasksStore } from "../../store/tasks-store";

export const useClearCompletedTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCompletedTasks(),
    onSuccess: () => {
      toast.success("Tasks deleted!");
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const { tasks } = queryClient.getQueryData(["tasks"]);
      console.log(tasks);

      queryClient.setQueryData(["tasks"], (prev) => {
        if (prev?.tasks) {
          return {
            ...prev,
            tasks: prev.tasks.filter((task) => task.completed == false),
          };
        }
      });
      return { tasks };
    },
    onError: (error, context) => {
      queryClient.setQueryData(["tasks"], context.tasks);
      toast.error(error?.message || "Failed to delete tasks");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
