import api from "./api.service";
import { getToken } from "./storage.service";

export const getAllTodos = async () => {
  const token = getToken();
  return await api.get("api/todo", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTodo = async (id, data) => {
  const token = getToken();
  return await api.put(`api/todo/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTodo = async (id) => {
  const token = getToken();
  return await api.get(`api/todo/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTodo = async (id) => {
  const token = getToken();
  return await api.delete(`api/todo/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTodo = async (data) => {
  const token = getToken();
  return await api.post("api/todo", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
