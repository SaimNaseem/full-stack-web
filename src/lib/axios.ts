import axios from "axios";

const resolveBaseUrl = (): string => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return process.env.BASE_API_URL ?? "http://localhost:8083";
  }

  if (process.env.NODE_ENV === "production") {
    return "/api/proxy";
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8083";
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
});

export default api;
