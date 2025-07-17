import axios from "axios";
import React, { useState, useEffect } from "react";
import { TodoHead } from "./TodoHead";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useAuthStore } from "../store/auth-store";
import { useTasksStore } from "../store/tasks-store";
import { useGetTasks } from "../hooks/taskHooks/useGetTasks";
import { getTasks } from "../api/tasksApi";

export const TodoContainer = () => {
  const [currentSort, setCurrentSort] = useState("All");

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        `${config.baseURL}/api/v1/tasks`,
        {
          name: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.task);
      getTasks();
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`${config.baseURL}/api/v1/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks();
    } catch (error) {
      console.log("There was an error deleting the task: ", error);
    }
  };

  // const toggleTodo = async (id) => {
  //   // console.log(todos);
  //   console.log("Toggling todo with id:", id);
  //   const todo = todos.find((todo) => todo._id === id);
  //   if (!todo) {
  //     console.error("Todo not found with id:", id);
  //     return;
  //   }

  //   const updatedTodo = { ...todo, completed: !todo.completed };

  //   try {
  //     const response = await axios.patch(
  //       `${config.baseURL}/api/v1/tasks/${id}`,
  //       {
  //         name: todo.name,
  //         completed: !todo.completed,
  //         createdBy: todo.createdBy,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     console.log("API response:", response.data);

  //     getTasks();
  //   } catch (error) {
  //     console.log("Error updating todo:", error);
  //   }
  // };

  const clearCompleted = async () => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/v1/tasks/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getTasks();
    } catch (error) {
      console.log("Error clearing completed tasks: ", error);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[545px] -translate-y-275 p-8">
      <TodoHead />
      <TodoForm addTodo={addTodo} />
      <TodoList
        removeTodo={removeTodo}
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};
