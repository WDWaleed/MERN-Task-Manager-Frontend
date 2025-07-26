import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";
import { useAuthStore } from "../../store/auth-store";
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
      navigate("/tasks");
    },
  });
};
