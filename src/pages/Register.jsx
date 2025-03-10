import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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
        `${config.baseURL}/api/v1/auth/register`,
        formData,
      );
      localStorage.setItem("jwt", JSON.stringify(response.data));
      setSuccess("Registration successful!");
      setError("");

      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError(err);
      setSuccess("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-very-dark-blue">
      <div className="w-full max-w-md rounded-lg bg-dark-very-dark-desaturated-blue p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Register
        </h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
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
              className="w-full rounded bg-dark-very-dark-grayish-blue p-2 text-white focus:outline-none"
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
              className="w-full rounded bg-dark-very-dark-grayish-blue p-2 text-white focus:outline-none"
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
              className="w-full rounded bg-dark-very-dark-grayish-blue p-2 text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-bright-blue px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
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
