import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth-store";
import { useRegister } from "../hooks/authHooks/useRegister";
import {
  MdAccountCircle,
  MdEmail,
  MdLock,
  MdOutlineAccountCircle,
} from "react-icons/md";

const Register = () => {
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    name: "",
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
    console.log("Registering...");
    e.preventDefault();
    if (
      formData.name === "" ||
      !formData.email === "" ||
      !formData.password === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const promise = registerMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: "Registering...",
      success: "Registration successful!",
      error: (err) =>
        err?.response?.data?.message || err?.message || "Registration failed",
    });
  };

  return (
    <div className="bg-main-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      <div className="bg-component-bg mx-8 w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="text-primary mb-8 text-center text-3xl font-bold">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="bg-input mb-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="name" className="text-primary hidden">
              Name:
            </label>
            <MdAccountCircle size={24} className="text-primary" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-primary w-full p-2 focus:outline-hidden"
            />
          </div>
          <div className="bg-input mb-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="email" className="text-primary hidden">
              Email:
            </label>
            <MdEmail size={24} className="text-primary" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>
          <div className="bg-input mb-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="password" className="text-primary hidden">
              Password:
            </label>{" "}
            <MdLock size={24} className="text-primary" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="bg-bright-blue text-button w-full rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-primary mt-4 text-center">
          Already have an account?{" "}
          <Link to="/tasks" className="text-bright-blue hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
