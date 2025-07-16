import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/auth";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useVerifyEmail = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (otp) => verifyEmail(otp),
    onSuccess: (data) => {
      setUser(data.user);
      console.log(data.user);
      toast.success("Verification successful!");
      navigate("/tasks");
    },
    onError: (error) => {
      toast.error(error?.msg || "Verification failed. Please try again.");
    },
  });
};
