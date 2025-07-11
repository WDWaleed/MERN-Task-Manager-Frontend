import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [todoInput, setTodoInput] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    addTodo(todoInput);
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
      <div className="flex items-center rounded-md bg-dark-very-dark-desaturated-blue px-5 drop-shadow-2xl">
        <span className="-mt-[3px] inline-block h-6 w-6 rounded-full border-2 border-dark-very-dark-grayish-blue-2"></span>
        <input
          type="text"
          id="todoInput"
          name="todo"
          placeholder="Create a new todo..."
          value={todoInput}
          onChange={handleChange}
          className="inline-block grow rounded-md bg-dark-very-dark-desaturated-blue p-4 text-[18px] text-dark-light-grayish-blue focus:outline-hidden"
        />
      </div>
    </form>
  );
};
