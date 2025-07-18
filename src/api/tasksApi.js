import { useTasksStore } from "../store/tasks-store";
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
  console.log(id);
  await axiosInstance.delete(`/tasks/${id}`);
};

const toggleTask = async (id) => {
  await axiosInstance.patch(`/tasks/${id}/toggle`);
};

export { getTasks, createTask, deleteTask, toggleTask };
