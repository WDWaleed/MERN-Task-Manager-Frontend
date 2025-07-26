import React, { useEffect, useRef, useState } from "react";
import { useVerifyEmail } from "../hooks/authHooks/useVerifyEmail";
import { useAuthStore } from "../store/auth-store";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSendVerificationOtp } from "../hooks/authHooks/useSendVerificationOtp";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const verifyEmailMutation = useVerifyEmail();
  const { mutateAsync: sendVerificationOtp } = useSendVerificationOtp();
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const [countdown, setCountdown] = useState(0);

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

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    setCountdown(60);
  }, []);

  const handleResendOtp = () => {
    toast.promise(sendVerificationOtp(), {
      loading: "Sending OTP...",
      success: "OTP Sent",
      error: "Error while sending OTP",
    });

    setCountdown(60);
  };

  return (
    <div className="bg-main-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      <form
        className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-3xl font-bold text-white">
          Verify Email
        </h2>
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
          className="bg-bright-blue text-button w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
        >
          Verify
        </button>
        <p className="text-primary mt-4">
          Didn't receive it?
          {countdown > 0 ? (
            <span className="ml-1">Request a new one in {countdown}s</span>
          ) : (
            <button
              onClick={handleResendOtp}
              className="ml-1 cursor-pointer text-blue-400 hover:underline"
              type="button"
              disabled={countdown > 0}
            >
              Resend
            </button>
          )}
        </p>
      </form>
    </div>
  );
};

export default VerifyEmail;
