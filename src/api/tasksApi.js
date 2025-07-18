import { axiosInstance } from "../utils/axios";

const getTasks = async () => {
  const { data } = await axiosInstance.get("/tasks");
  console.log(data);
  return data;
};

const createTask = async (name) => {
  await axiosInstance.post("/tasks", { name });
};

const deleteTask = async (id) => {
  await axiosInstance.delete(`/tasks/${id}`);
};

export { getTasks, createTask, deleteTask };
