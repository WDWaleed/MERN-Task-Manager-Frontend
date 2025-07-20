import React from "react";
import { useUserStore } from "../store/user-store";

export const TodoHead = () => {
  const theme = useUserStore((state) => state.theme);
  const setTheme = useUserStore((state) => state.setTheme);
  return (
    <div className="mx-auto my-8 flex justify-between">
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
