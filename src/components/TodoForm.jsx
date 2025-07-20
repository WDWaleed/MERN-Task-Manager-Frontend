import React, { useState } from "react";
import { useCreateTask } from "../hooks/taskHooks/useCreateTask";

export const TodoForm = () => {
  const [todoInput, setTodoInput] = React.useState("");

  const createTaskMutation = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    createTaskMutation.mutate(todoInput);
    setTodoInput("");
  };

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <label htmlFor="todoInput" className="visually-hidden">
        Enter a new todo item
      </label>
      <div className="bg-component-bg flex items-center rounded-md px-5 drop-shadow-2xl">
        <span className="border-accent -mt-[3px] inline-block h-6 w-6 rounded-full border-2"></span>
        <input
          type="text"
          id="todoInput"
          name="todo"
          placeholder="Create a new todo..."
          value={todoInput}
          onChange={handleChange}
          className="bg-component-bg text-primary inline-block grow rounded-md p-4 text-[18px] focus:outline-hidden"
        />
      </div>
    </form>
  );
};
