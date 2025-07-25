import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";
import { useAuthStore } from "../../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUser(data.user);
      toast.success("Logged In!");
      navigate("/tasks");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    },
  });
};
