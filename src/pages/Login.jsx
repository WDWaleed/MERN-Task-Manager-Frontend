import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Add this to verify the function is called
    console.log("Form data:", formData); // Verify formData has values
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await toast.promise(await login(formData.email, formData.password), {
        loading: "Authenticating...",
        success: (data) => data.msg || "Logged In!",
        error: (err) => {
          if (err.response) {
            return (
              err.response.data.msg ||
              "Authentication failed. Please try again."
            );
          } else if (err.request) {
            return "Network error. Please check your connection.";
          } else {
            return "An unexpected error occurred.";
          }
        },
      });

      navigate("/tasks");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg || "Login failed. Please try again.");
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-dark-very-dark-blue flex min-h-screen items-center justify-center">
      <div className="bg-dark-very-dark-desaturated-blue w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Login
        </h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link to="/register" className="text-bright-blue hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
