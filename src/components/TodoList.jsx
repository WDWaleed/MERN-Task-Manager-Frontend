import React from "react";
import { TodoItem } from "./TodoItem";
import TodoFooter from "./TodoFooter";

export const TodoList = ({
  todos,
  setTodos,
  removeTodo,
  toggleTodo,
  currentSort,
  setCurrentSort,
  clearCompleted,
}) => {
  // Filter todos based on currentSort value
  const filteredTodos = todos.filter((todo) => {
    if (currentSort === "Active") {
      return !todo.completed;
    } else if (currentSort === "Completed") {
      return todo.completed;
    }
    // Default case for "All"
    return true;
  });

  return (
    <section className="mt-6 rounded-md bg-dark-very-dark-desaturated-blue text-dark-light-grayish-blue drop-shadow-2xl">
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo._id}>
            <TodoItem
              todoText={todo.text}
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

      <TodoFooter
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        todos={todos}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};
