import React from "react";

const TodoFooter = ({ currentSort, setCurrentSort, todos, clearCompleted }) => {
  // Calculate the number of active items
  const activeItemsCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex justify-between rounded-md bg-dark-very-dark-desaturated-blue px-5 py-4 text-[12px] text-dark-dark-grayish-blue">
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
        className={`transition-colors duration-300 hover:text-dark-light-grayish-blue-hover`}
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;
