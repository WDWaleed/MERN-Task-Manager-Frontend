import React from "react";
import { useTasksStore } from "../store/tasks-store";
import { useClearCompletedTasks } from "../hooks/taskHooks/useClearCompletedTasks";

const TodoFooter = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const currentSort = useTasksStore((state) => state.currentSort);
  const setCurrentSort = useTasksStore((state) => state.setCurrentSort);
  const clearCompletedTasks = useClearCompletedTasks();

  const activeItemsCount = (tasks || [])?.filter(
    (task) => !task.completed,
  ).length;

  const clearCompleted = async () => {
    if (tasks.length - activeItemsCount > 0) clearCompletedTasks.mutate();
    // Only send a request if there are completed tasks to be cleared
  };

  return (
    <div className="bg-component-bg text-secondary flex justify-between rounded-md px-5 py-4 text-[12px]">
      <p>{activeItemsCount} items left</p>
      <div id="buttons-container" className="flex gap-4">
        <button
          className={`transition-colors duration-200 ${currentSort === "All" ? "text-bright-blue" : "hover:text-hover-text"} `}
          onClick={() => setCurrentSort("All")}
        >
          All
        </button>
        <button
          className={`transition-colors duration-200 ${currentSort === "Active" ? "text-bright-blue" : "hover:text-hover-text"} `}
          onClick={() => setCurrentSort("Active")}
        >
          Active
        </button>
        <button
          className={`transition-colors duration-200 ${currentSort === "Completed" ? "text-bright-blue" : "hover:text-hover-text"} `}
          onClick={() => setCurrentSort("Completed")}
        >
          Completed
        </button>
      </div>
      <button
        className={`hover:text-hover-text transition-colors duration-300`}
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;
