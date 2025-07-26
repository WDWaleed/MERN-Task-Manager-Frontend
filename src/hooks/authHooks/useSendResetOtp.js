import { useMutation } from "@tanstack/react-query";
import { sendResetOtp } from "../../api/authApi";
import toast from "react-hot-toast";

export const useSendResetOtp = () => {
  return useMutation({
    mutationFn: (email) => sendResetOtp(email),
  });
};
