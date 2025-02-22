import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  done: boolean;
}

const fetchTasks = async () => {
  const response = await axios.get<Task[]>("/tasks.json");
  return response.data.map((task) => ({ ...task, done: false }));
};

export const useTasks = () => {
  return useQuery<Task[]>({ queryKey: ["tasks"], queryFn: fetchTasks });
};
