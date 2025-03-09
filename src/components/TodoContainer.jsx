import axios from "axios";
import React, { useState, useEffect } from "react";
import { TodoHead } from "./TodoHead";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import config from "../config";

export const TodoContainer = () => {
  const [todos, setTodos] = React.useState([]);
  const fetchTasks = async () => {
    try {
      // await localStorage.removeItem("jwt");

      const response = await axios.get(`${config.baseURL}/api/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.tasks);
      setTodos(response.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks: ", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const [currentSort, setCurrentSort] = useState("All");

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(`${api}/api/v1/tasks`, {
        text: newTodo,
        completed: false,
      });
      const savedTodo = response.data.task;
      setTodos([
        ...todos,
        {
          _id: savedTodo._id,
          text: savedTodo.text,
          completed: savedTodo.completed,
        },
      ]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`${api}/api/v1/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("There was an error deleting the task: ", error);
    }
  };

  const toggleTodo = async (id) => {
    console.log(todos);
    console.log("Toggling todo with id:", id);
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) {
      console.error("Todo not found with id:", id);
      return;
    }

    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const response = await axios.patch(`${api}/api/v1/tasks/${id}`, {
        completed: updatedTodo.completed,
      });

      console.log("API response:", response.data);

      fetchTasks();
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const clearCompleted = async () => {
    const response = await axios.delete(`${api}/api/v1/tasks`);
    console.log(response.data.message);
    fetchTasks();
    // setTodos(todos.filter((todo) => !todo.completed));
  };
  return (
    <section className="mx-auto w-full max-w-[545px] -translate-y-275 p-8">
      <TodoHead />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};
