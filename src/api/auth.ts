import axiosClient from "./axiosClient";

export type User = {
  id: number;
  name: string;
  email: string;
};

const AUTH_BASE_URL = "http://localhost:8000";

export async function fetchCurrentUser() {
  const response = await axiosClient.get<User>("/api/user", {
    baseURL: AUTH_BASE_URL,
  });

  return response.data;
}

export async function login(email: string, password: string) {
  await axiosClient.get("/sanctum/csrf-cookie", {
    baseURL: AUTH_BASE_URL,
  });

  await axiosClient.post(
    "/login",
    { email, password },
    { baseURL: AUTH_BASE_URL },
  );

  return fetchCurrentUser();
}

export async function logout() {
  await axiosClient.post("/logout", null, {
    baseURL: AUTH_BASE_URL,
  });
}