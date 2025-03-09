import React, { useState } from "react";
import "../styles/TodoItem.css";

export const TodoItem = ({
  id,
  todoText,
  completed,
  toggleTodo,
  setTodos,
  removeTodo,
}) => {
  const [xVisible, setXVisible] = useState(false);

  return (
    <div
      className="flex gap-4 border-b border-dark-very-dark-grayish-blue-2 px-5 py-4 text-[18px] text-dark-light-grayish-blue"
      onMouseEnter={() => setXVisible(true)}
      onMouseLeave={() => setXVisible(false)}
    >
      <span
        className={`checkmark flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 ${
          completed
            ? "border-none bg-checkBackground"
            : "border-dark-very-dark-grayish-blue-2"
        } `}
        onClick={() => toggleTodo(id)}
      >
        {completed ? <img src="/icon-check.svg" alt="Tick" /> : ""}
      </span>
      <p
        className={` ${completed ? "text-dark-very-dark-grayish-blue line-through" : ""}`}
      >
        {todoText}
      </p>
      <span
        className={`ml-auto mt-1 cursor-pointer transition-opacity duration-300 ${xVisible ? "opacity-100" : "opacity-0"}`}
        onClick={removeTodo}
      >
        <img src="/icon-cross.svg" alt="X" />
      </span>
    </div>
  );
};
