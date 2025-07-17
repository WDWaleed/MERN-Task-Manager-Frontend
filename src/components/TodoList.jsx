import React, { useEffect } from "react";
import { TodoItem } from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { useTasksStore } from "../store/tasks-store";
import { useGetTasks } from "../hooks/taskHooks/useGetTasks";

export const TodoList = ({
  removeTodo,
  toggleTodo,
  currentSort,
  setCurrentSort,
  clearCompleted,
}) => {
  const tasks = useTasksStore((state) => state.tasks);
  const { data, isLoading } = useGetTasks();
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    setTodos(tasks);
  }, [tasks]);

  // Filter todos based on currentSort value
  const filteredTodos = todos?.filter((todo) => {
    if (currentSort === "Active") {
      return !todo.completed;
    } else if (currentSort === "Completed") {
      return todo.completed;
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
          {filteredTodos?.map((todo) => (
            <li key={todo._id}>
              <TodoItem
                todoText={todo.name}
                id={todo._id}
                completed={todo.completed}
                toggleTodo={toggleTodo}
                todos={todos}
                setTodos={setTodos}
                removeTodo={() => removeTodo(todo._id)}
              />
            </li>
          ))}
        </ul>
      )}

      <TodoFooter
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        todos={todos}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};
