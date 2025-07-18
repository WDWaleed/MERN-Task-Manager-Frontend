import React, { useState } from "react";
import "../styles/TodoItem.css";
import { useDeleteTask } from "../hooks/taskHooks/useDeleteTask";
import { useToggleTask } from "../hooks/taskHooks/useToggleTask";

export const TodoItem = ({ id, taskText, completed }) => {
  const deleteMutation = useDeleteTask();
  const toggleMutation = useToggleTask();

  const deleteTask = async (id) => {
    deleteMutation.mutate(id);
  };

  const toggleTask = async (id) => {
    toggleMutation.mutate(id);
  };

  return (
    <div className="border-dark-very-dark-grayish-blue-2 text-dark-light-grayish-blue flex gap-4 border-b px-5 py-4 text-[18px]">
      <span
        className={`checkmark flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 ${
          completed
            ? "border-none bg-[linear-gradient(hsl(192,100%,67%),hsl(280,87%,65%))]"
            : "border-dark-very-dark-grayish-blue-2"
        }`}
        onClick={() => toggleTask(id)}
      >
        {completed ? <img src="/icon-check.svg" alt="Tick" /> : ""}
      </span>

      <p
        className={` ${completed ? "text-dark-very-dark-grayish-blue line-through" : ""}`}
      >
        {taskText}
      </p>
      <span
        className={`mt-1 ml-auto cursor-pointer`}
        onClick={() => deleteTask(id)}
      >
        <img src="/icon-cross.svg" alt="X" />
      </span>
    </div>
  );
};
