import { axiosInstance } from "../utils/axios";

const getUserData = async () => {
  const { data } = await axiosInstance.get("/user/data");
  return data;
};

export { getUserData };
