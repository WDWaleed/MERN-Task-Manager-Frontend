import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/authHooks/useLogout";
import { useAuthStore } from "../store/auth-store";

const NavBar = () => {
  const logoutMutation = useLogout();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <header className="bg-component-bg text-primary fixed top-0 z-50 w-full">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-6">
        <Link to={"/"}>
          <h2 className="text-3xl font-extrabold">LOGO</h2>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <Link to={"/tasks"}>
              <li>Tasks</li>
            </Link>
            <Link to={"/register"}>
              <li>Register</li>
            </Link>
          </ul>
        </nav>
        <div>
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="bg-primary text-main-bg flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xl font-medium"
                onClick={() => setOptionsOpen(!optionsOpen)}
              >
                {user.name[0]}
              </button>
              <div
                className={`absolute top-4 right-[110%] w-36 rounded-md bg-white shadow-md transition-all duration-300 ease-in-out ${optionsOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} `}
              >
                <ul className="space-y-2 text-black">
                  <li className="rounded-md px-4 pt-4 transition-colors duration-100 ease-in-out hover:bg-gray-300">
                    <Link to="/tasks" className="flex items-center gap-2">
                      {" "}
                      <img
                        src="/checklist.png"
                        alt="Tasks"
                        className="inline-block h-7 w-7"
                      />
                      My Tasks
                    </Link>
                  </li>
                  <li className="rounded-md px-4 pb-4 transition-colors duration-100 ease-in-out hover:bg-gray-300">
                    <button
                      onClick={() => logoutMutation.mutate()}
                      className="flex items-center gap-2"
                    >
                      <img
                        src="/logout.png"
                        alt="Logout"
                        className="inline-block h-7 w-7 scale-x-[-1]"
                      />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
