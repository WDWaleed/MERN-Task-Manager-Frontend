import React, { useEffect } from "react";
import { TodoItem } from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { useTasksStore } from "../store/tasks-store";
import { useGetTasks } from "../hooks/taskHooks/useGetTasks";

export const TodoList = () => {
  const currentSort = useTasksStore((state) => state.currentSort);
  const { data, isLoading } = useGetTasks();

  // Filter todos based on currentSort value
  // Maybe use useMemor for this:
  const filteredTasks = data?.tasks?.filter((task) => {
    if (currentSort === "Active") {
      return !task.completed;
    } else if (currentSort === "Completed") {
      return task.completed;
    }
    // Default case for "All"
    return true;
  });

  return (
    <section className="bg-dark-very-dark-desaturated-blue text-dark-light-grayish-blue mt-6 rounded-md drop-shadow-2xl">
      {isLoading ? (
        "Loading tasks..."
      ) : (
        <ul>
          {filteredTasks?.map((task) => (
            <li key={task._id}>
              <TodoItem
                taskText={task.name}
                id={task._id}
                completed={task.completed}
                // toggleTodo={toggleTodo}
                // todos={todos}
                // setTodos={setTodos}
                // removeTodo={() => removeTodo(todo._id)}
              />
            </li>
          ))}
        </ul>
      )}

      <TodoFooter />
    </section>
  );
};
