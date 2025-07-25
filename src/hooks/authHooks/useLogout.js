import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/authApi";
import { useAuthStore } from "../../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      setIsLoggedIn(false);
      setUser(null);
      toast.success("Logged out!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.message || "Operation failed. Please try again.");
    },
  });
};
