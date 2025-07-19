import React, { useEffect, useRef } from "react";
import { useVerifyEmail } from "../hooks/authHooks/useVerifyEmail";
import { useAuthStore } from "../store/auth-store";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const VerifyEmail = () => {
  const verifyEmailMutation = useVerifyEmail();
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  if (!location.state?.authorized) {
    return <Navigate to="/" replace />;
  }

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputRef.current.map((e) => e.value).join("");

    verifyEmailMutation.mutate(otp);
  };

  useEffect(() => {
    user?.isAccountVerified && navigate("/tasks");
  }, [user]);

  return (
    <div className="bg-dark-very-dark-blue flex min-h-screen items-center justify-center">
      <form
        className="bg-dark-very-dark-desaturated-blue w-full max-w-md rounded-lg p-8 text-center shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold text-white">
          Verify Email
        </h1>
        <p className="text-gray-400">
          Enter the 6-digit code sent to your email
        </p>
        <div className="my-8 flex justify-between">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                className="h-12 w-12 rounded-md bg-[#333A5C] text-center text-xl text-white"
                ref={(e) => (inputRef.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
        </div>
        <button
          type="submit"
          className="bg-bright-blue w-full cursor-pointer rounded-sm px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
