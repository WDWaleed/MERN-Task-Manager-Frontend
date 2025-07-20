import React from "react";
import { useUserStore } from "../store/user-store";

export const TodoHead = () => {
  const theme = useUserStore((state) => state.theme);
  const setTheme = useUserStore((state) => state.setTheme);
  return (
    <div className="mx-auto mt-18 flex justify-between md:my-8">
      <h1 className="tracking-10px text-4xl font-bold text-gray-300">TODO</h1>
      <button
        onClick={() => {
          theme == "" ? setTheme("light") : setTheme("");
        }}
      >
        <img
          src={theme == "" ? "/icon-sun.svg" : "/icon-moon.svg"}
          alt={theme == "" ? "Sun" : "Moon"}
          className="h-[26px] w-[26px]"
        />
      </button>
    </div>
  );
};
