import React from "react";

const NotFound = () => {
  return (
    <div className="bg-main-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      <div className="bg-component-bg mx-8 w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="text-primary text-center text-3xl font-bold">
          404 - Not Found
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
