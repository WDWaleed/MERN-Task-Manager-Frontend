import React, { useEffect, useRef, useState } from "react";
import { useSendResetOtp } from "../hooks/authHooks/useSendResetOtp";
import { useResetPassword } from "../hooks/authHooks/useResetPassword";
import { MdEmail, MdLock } from "react-icons/md";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const {
    mutateAsync: sendResetOtp,
    isSuccess,
    isPending: sendingEmail,
  } = useSendResetOtp();
  const { mutateAsync: resetPassword, isPending: sendingPassword } =
    useResetPassword();

  const [countdown, setCountdown] = useState(0);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRef = useRef([]);

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    toast.promise(sendResetOtp(email), {
      loading: "Sending OTP...",
      success: (data) => data?.message || "OTP sent!",
      error: (error) =>
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send OTP",
    });
  };

  useEffect(() => {
    isSuccess && setIsEmailSent(true);
  }, [isSuccess]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const resetOtp = inputRef.current.map((e) => e.value).join("");
    if (resetOtp) {
      setOtp(resetOtp);
      setIsOtpSubmitted(true);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    toast.promise(resetPassword({ email, otp, newPassword }), {
      loading: "Processing...",
      success: (data) => data?.message || "Password has been reset",
      error: (error) =>
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset password",
    });
  };

  // Limiting OTP requests to one per minute
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
    setCountdown(0);
  }, []);

  const handleResendOtp = () => {
    toast.promise(sendResetOtp(email), {
      loading: "Sending OTP...",
      success: "OTP Sent",
      error: "Error while sending OTP",
    });

    setCountdown(60);
  };

  return (
    <div className="bg-main-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      {!isEmailSent && (
        <form
          className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg"
          onSubmit={(e) => handleEmailSubmit(e)}
        >
          <h2 className="text-primary text-center text-3xl font-bold">
            Reset Password
          </h2>
          <p className="text-primary">Enter your registered email</p>
          <div className="bg-input my-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="email" className="text-primary hidden">
              Email:
            </label>
            <MdEmail size={24} className="text-primary" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="bg-bright-blue text-button w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
            disabled={sendingEmail}
          >
            Submit
          </button>
        </form>
      )}

      {/* OTP Input Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={(e) => handleOtpSubmit(e)}
          className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg"
        >
          <h2 className="text-primary text-center text-3xl font-bold">
            Reset Password
          </h2>
          <p className="text-primary">Enter the 6-digit OTP emailed to you</p>
          <div className="my-8 flex justify-between">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength={1}
                  key={index}
                  required
                  className="bg-otp text-primary h-12 w-12 rounded-md text-center text-xl"
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
            Submit
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
      )}

      {/* Enter New Password */}
      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={(e) => handlePasswordSubmit(e)}
          className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg"
        >
          <h2 className="text-primary text-center text-3xl font-bold">
            New Password
          </h2>
          <div className="bg-input my-6 flex w-full items-center rounded-sm px-3">
            <label htmlFor="password" className="text-primary hidden">
              Password:
            </label>
            <MdLock size={24} className="text-primary" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-input text-primary w-full rounded-sm p-2 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="bg-bright-blue text-button w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
            disabled={sendingPassword}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
