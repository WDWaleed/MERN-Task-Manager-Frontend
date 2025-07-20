import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth-store";
import { useRegister } from "../hooks/authHooks/useRegister";

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
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Form data:", formData);
    if (
      formData.name === "" ||
      !formData.email === "" ||
      !formData.password === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <div className="bg-main-bg flex min-h-screen items-center justify-center">
      <div className="bg-component-bg mx-8 w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-3xl font-bold">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-primary mb-2 block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-primary mb-2 block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-primary mb-2 block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="bg-bright-blue text-primary w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
          >
            {registerMutation.isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-primary mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-bright-blue hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
