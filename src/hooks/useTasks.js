import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export function useTasks(params = {}) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/tasks`, {
        headers: getHeaders(),
        params,
      });
      return data;
    },
    enabled: !!localStorage.getItem("token"),
  });
}

export function useTaskStats() {
  return useQuery({
    queryKey: ["taskStats"],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/tasks/stats`, { headers: getHeaders() });
      return data;
    },
    enabled: !!localStorage.getItem("token"),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (taskData) => {
      const { data } = await axios.post(`${API}/tasks`, taskData, { headers: getHeaders() });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API}/tasks/${id}`, { headers: getHeaders() });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["taskStats"] });
    },
  });
}