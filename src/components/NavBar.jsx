import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed top-0 z-50 mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between border-2 border-white px-4 text-gray-300">
      <Link to={"/"}>
        <h2 className="font-extrabold">LOGO</h2>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <li>Dummy1</li>
          <li>Dummy2</li>
          <li>Dummy3</li>
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
