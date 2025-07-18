import React from "react";
import { useTasksStore } from "../store/tasks-store";

const TodoFooter = ({ clearCompleted }) => {
  const tasks = useTasksStore((state) => state.tasks);
  const currentSort = useTasksStore((state) => state.currentSort);
  const setCurrentSort = useTasksStore((state) => state.setCurrentSort);

  const activeItemsCount = (tasks || [])?.filter(
    (task) => !task.completed,
  ).length;

  return (
    <div className="bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue flex justify-between rounded-md px-5 py-4 text-[12px]">
      <p>{activeItemsCount} items left</p>
      <div id="buttons-container" className="flex gap-4">
        <button
          className={`transition-colors duration-200 ${currentSort === "All" ? "text-bright-blue" : "hover:text-dark-light-grayish-blue-hover"} `}
          onClick={() => setCurrentSort("All")}
        >
          All
        </button>
        <button
          className={`transition-colors duration-200 ${currentSort === "Active" ? "text-bright-blue" : "hover:text-dark-light-grayish-blue-hover"} `}
          onClick={() => setCurrentSort("Active")}
        >
          Active
        </button>
        <button
          className={`transition-colors duration-200 ${currentSort === "Completed" ? "text-bright-blue" : "hover:text-dark-light-grayish-blue-hover"} `}
          onClick={() => setCurrentSort("Completed")}
        >
          Completed
        </button>
      </div>
      <button
        className={`hover:text-dark-light-grayish-blue-hover transition-colors duration-300`}
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;
