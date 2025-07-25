import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, otp, newPassword: password }) => {
      console.log(email, otp, password);
      resetPassword(email, otp, password);
    },
    onSuccess: (data) => {
      toast.success("Password resetted successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occured. Please try again.",
      );
    },
  });
};
