import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/authApi";
import { useAuthStore } from "../../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ name, email, password }) => register(name, email, password),
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/verify-email", { state: { authorized: true } });
    },
  });
};
