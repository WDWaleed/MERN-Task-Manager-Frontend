import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../api/userApi";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: 10000,
  });
};
