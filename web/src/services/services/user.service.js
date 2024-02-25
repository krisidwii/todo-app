import api from "./api.service";
import { getToken } from "./storage.service";

export const postLogin = async (data) => {
  console.log(data);
  return await api.post("auth/login", data);
};

export const postRegister = async (data) => {
  return await api.post("auth/register", data);
};

export const getLogout = async () => {
  return await api.get("auth/logout");
};

export const getSession = async (token) => {
  if (!token) {
    token = getToken();
  }

  return await api.get("auth/session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
