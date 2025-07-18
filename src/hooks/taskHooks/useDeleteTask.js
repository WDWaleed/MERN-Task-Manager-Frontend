import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTask } from "../../api/tasksApi";
import { useTasksStore } from "../../store/tasks-store";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const setTasks = useTasksStore((state) => state.setTasks);

  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: () => {
      toast.success("Task deleted!");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const { tasks } = queryClient.getQueryData(["tasks"]);
      console.log(tasks);

      queryClient.setQueryData(["tasks"], (prev) => {
        if (prev?.tasks) {
          return {
            ...prev,
            tasks: prev.tasks.filter((task) => task._id != id),
          };
        }
      });
      return { tasks };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["tasks"], context.tasks);
      toast.error(error?.message || "Failed to add task");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
