import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, otp, newPassword: password }) => {
      resetPassword(email, otp, password);
    },
    onSuccess: (data) => {
      navigate("/login");
    },
  });
};
