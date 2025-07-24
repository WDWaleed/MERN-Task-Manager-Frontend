import React, { useRef, useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
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

  const handleEmailSubmit = async () => {};
  return (
    <div className="bg-main-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      {!isEmailSent && (
        <form
          className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg"
          onSubmit={handleEmailSubmit}
        >
          <h2 className="text-primary text-center text-3xl font-bold">
            Reset Password
          </h2>
          <p className="text-primary">Enter your registered email</p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-input text-primary mt-8 mb-8 w-full rounded-sm p-2 focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-bright-blue text-primary w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}

      {/* OTP Input Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-primary text-center text-3xl font-bold">
            Reset Password
          </h2>
          <p className="text-primary">
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
            Submit
          </button>
        </form>
      )}

      {/* Enter New Password */}
      {isEmailSent && isOtpSubmitted && (
        <form className="bg-component-bg w-full max-w-md rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-primary text-center text-3xl font-bold">
            New Password
          </h2>
          <p className="text-primary">Enter the new password</p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="bg-input text-primary mt-8 mb-8 w-full rounded-sm p-2 focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-bright-blue text-primary w-full cursor-pointer rounded-sm px-4 py-2 transition-colors duration-200 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
