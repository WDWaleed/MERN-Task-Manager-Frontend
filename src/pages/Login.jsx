import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const Login = ({ isLoggedIn, setIsLoggedIn, token, setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    try {
      const response = await axios.post(
        `${config.baseURL}/api/v1/auth/login`,
        formData,
      );
      console.log(response.data);
      localStorage.setItem("jwt", JSON.stringify(response.data));
      const { token } = response.data;
      setToken(token);

      setIsLoggedIn(true);

      setSuccess("Login successful!");
      setError("");

      navigate("/");

      // Handle successful login (e.g., save token, redirect)
    } catch (err) {
      setError("Login failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-very-dark-blue">
      <div className="w-full max-w-md rounded-lg bg-dark-very-dark-desaturated-blue p-8 shadow-lg">
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
              className="w-full rounded-sm bg-dark-very-dark-grayish-blue p-2 text-white focus:outline-hidden"
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
              className="w-full rounded-sm bg-dark-very-dark-grayish-blue p-2 text-white focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-sm bg-bright-blue px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
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
