import React from "react";

export const TodoHead = () => {
  return (
    <div className="my-8 mx-auto flex justify-between ">
      <h1 className="text-light-very-light-gray text-4xl font-bold tracking-10px">
        TODO
      </h1>
      <button>
        <img src="/icon-sun.svg" alt="Sun Icon" className="h-[26px] w-[26px]" />
      </button>
    </div>
  );
};
