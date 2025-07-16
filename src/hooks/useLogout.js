import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsLoggedIn(false);
      setUser(null);
      toast.success("Logged out!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.msg || "Operation failed. Please try again.");
    },
  });
};
