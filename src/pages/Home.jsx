import React from "react";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
        <h1 className="mx-16 max-w-2xl text-center text-4xl font-bold text-gray-300">
          MERN Task Manager
        </h1>
      </div>
    </>
  );
};

export default Home;
