import { useMutation } from "@tanstack/react-query";
import { sendVerificationOtp } from "../../api/authApi";

export const useSendVerificationOtp = () => {
  return useMutation({
    mutationFn: sendVerificationOtp,
  });
};
