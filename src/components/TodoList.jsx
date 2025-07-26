import React, { useEffect } from "react";
import { TodoItem } from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { useTasksStore } from "../store/tasks-store";
import { useGetTasks } from "../hooks/taskHooks/useGetTasks";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export const TodoList = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetTasks();
  const currentSort = useTasksStore((state) => state.currentSort);
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  useEffect(() => {
    setTasks(data?.tasks);
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Something went wrong");
    }
  }, [isError]);

  // Filter todos based on currentSort value
  // Maybe use useMemo for this:
  const filteredTasks = tasks?.filter((task) => {
    if (currentSort === "Active") {
      return !task.completed;
    } else if (currentSort === "Completed") {
      return task.completed;
    }
    // Default case for "All"
    return true;
  });

  return (
    <section className="bg-component-bg text-primary mt-6 rounded-md drop-shadow-2xl">
      {isLoading ? (
        <div className="mx-auto w-12">
          <Spinner />
        </div>
      ) : (
        <ul>
          {filteredTasks?.map((task) => (
            <li key={task._id}>
              <TodoItem
                taskText={task.name}
                id={task._id}
                completed={task.completed}
              />
            </li>
          ))}
        </ul>
      )}

      <TodoFooter />
    </section>
  );
};
