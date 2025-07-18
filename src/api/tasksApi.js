import { axiosInstance } from "../utils/axios";

const getTasks = async () => {
  const { data } = await axiosInstance.get("/tasks");
  console.log(data);
  return data;
};

const createTask = async (name) => {
  await axiosInstance.post("/tasks", { name });
};

export { getTasks, createTask };
