import { axiosInstance } from "../utils/axios";

const getTasks = async () => {
  const { data } = await axiosInstance.get("/tasks");
  console.log(data);
  return data;
};

const createTask = async (taskName) => {
  await axiosInstance.post("/tasks", { taskName });
};

export { getTasks, createTask };
