import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth-store";

const Register = () => {
  const register = useAuthStore((state) => state.register);

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

    try {
      const data = await toast.promise(
        register(formData.name, formData.email, formData.password),
        {
          loading: "Creating account...",
          success: (data) => data.msg || "Registration successful!",
          error: (err) => {
            if (err.response) {
              return (
                err.response.data.msg ||
                "Registration failed. Please try again."
              );
            } else if (err.request) {
              return "Network error. Please check your connection.";
            } else {
              return "An unexpected error occurred.";
            }
          },
        },
      );

      navigate("/");
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  return (
    <div className="bg-dark-very-dark-blue flex min-h-screen items-center justify-center">
      <div className="bg-dark-very-dark-desaturated-blue w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-dark-very-dark-grayish-blue w-full rounded-sm p-2 text-white focus:outline-hidden"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-dark-very-dark-grayish-blue w-full rounded-sm p-2 text-white focus:outline-hidden"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-dark-very-dark-grayish-blue w-full rounded-sm p-2 text-white focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="bg-bright-blue w-full cursor-pointer rounded-sm px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-white">
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
