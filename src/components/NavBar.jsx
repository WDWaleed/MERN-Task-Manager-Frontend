import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const NavBar = () => {
  const logoutMutation = useLogout();
  return (
    <div className="fixed top-0 z-50 mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between border-2 border-white px-4 text-gray-300">
      <Link to={"/"}>
        <h2 className="font-extrabold">LOGO</h2>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <Link to={"/register"}>
            <li>Register</li>
          </Link>
          <Link to={"/login"}>
            <li>Login</li>
          </Link>
          <li>
            <button
              className="cursor-pointer"
              onClick={() => logoutMutation.mutate()}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <Link to={"/login"}>
          <button className="cursor-pointer">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
