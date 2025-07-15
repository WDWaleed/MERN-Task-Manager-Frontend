import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ name, email, password }) => register(name, email, password),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Registration successful!");
      navigate("/verify-email");
    },
    onError: (error) => {
      toast.error(error?.msg || "Registration failed. Please try again.");
    },
  });
};
