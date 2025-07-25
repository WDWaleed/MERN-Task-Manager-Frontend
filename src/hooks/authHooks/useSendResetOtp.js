import { useMutation } from "@tanstack/react-query";
import { sendResetOtp } from "../../api/authApi";
import toast from "react-hot-toast";

export const useSendResetOtp = () => {
  return useMutation({
    mutationFn: (email) => sendResetOtp(email),
    onSuccess: (data) => {
      toast.success(data?.message || "OTP Sent");
    },
    onError: (error) => {
      error?.response?.data?.message &&
        console.log(error.response.data.message);
    },
  });
};
