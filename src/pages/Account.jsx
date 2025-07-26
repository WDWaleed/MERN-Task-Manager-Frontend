import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useGetUserData } from "../hooks/userHooks/useGetUser";
import { replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Account = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUserData();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(data?.userData);
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      navigate("/login", replace);
    }
  }, [isError]);

  return (
    <div className="bg-main-bg text-primary flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-component-bg mx-8 w-full max-w-md rounded-lg p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-white">
            Account Details
          </h2>
          <div>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <button
              onClick={() => navigate("/reset-password")}
              className="bg-bright-blue text-primary mt-6 w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
            >
              Reset Password
            </button>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Account;
