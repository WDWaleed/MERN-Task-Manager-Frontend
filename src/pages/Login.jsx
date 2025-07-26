import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogin } from "../hooks/authHooks/useLogin";
import {
  MdAccountCircle,
  MdLock,
  MdOutlineAccountCircle,
} from "react-icons/md";

const Login = () => {
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const promise = loginMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: "Authenticating...",
      success: "Logged In!",
      error: (err) =>
        err?.response?.data?.message || err?.message || "Unauthorized",
    });
  };

  return (
    <div className="bg-main-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      <div className="bg-component-bg mx-8 w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="text-primary mb-8 text-center text-3xl font-bold">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="bg-input mb-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="email" className="text-primary hidden">
              Email:
            </label>
            <MdAccountCircle size={24} className="text-primary" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-primary w-full p-2 focus:outline-hidden"
            />
          </div>
          <div className="bg-input mb-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="password" className="text-primary hidden">
              Password:
            </label>
            <MdLock size={24} className="text-primary" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="text-primary w-full p-2 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="bg-bright-blue text-button w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-primary mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-bright-blue hover:underline">
            Register
          </Link>
        </p>
        <p className="text-primary text-center">
          Forgot Password?{" "}
          <Link
            to="/reset-password"
            className="text-bright-blue hover:underline"
          >
            Reset It
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
