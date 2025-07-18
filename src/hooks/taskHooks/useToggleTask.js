import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toggleTask } from "../../api/tasksApi";
import { useTasksStore } from "../../store/tasks-store";

export const useToggleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => toggleTask(id),
    onSuccess: () => {
      toast.success("Task updated!");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const { tasks } = queryClient.getQueryData(["tasks"]);
      console.log(tasks);

      queryClient.setQueryData(["tasks"], (prev) => {
        if (prev?.tasks) {
          return {
            ...prev,
            tasks: prev.tasks.map((task) => task._id == id && !task.completed),
          };
        }
      });
      return { tasks };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["tasks"], context.tasks);
      toast.error(error?.message || "Failed to toggle task");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
