import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTask } from "../../api/tasksApi";
import { useTasksStore } from "../../store/tasks-store";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const setTasks = useTasksStore((state) => state.setTasks);

  return useMutation({
    mutationFn: (taskName) => createTask(taskName),
    onSuccess: () => {
      toast.success("Task added!");
    },
    onMutate: async (name) => {
      //This name is the same as taskName, just different name

      await queryClient.cancelQueries({ queryKey: ["tasks"] }); // Preventing a GET request for tasks. We'll do this onSuccess

      const { tasks } = queryClient.getQueryData(["tasks"]);

      // setTasks([...tasks, { id: Date.now(), name }]);
      queryClient.setQueryData(["tasks"], (prev) => {
        if (prev?.tasks) {
          return {
            ...prev,
            tasks: [{ id: Date.now(), name }, ...prev.tasks],
          };
        }
      });
      return { tasks };
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData(["tasks"], context.tasks);
      toast.error(error?.message || "Failed to add task");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
