import axios from "axios";

// Base URL is configurable via env (REACT_APP_API_URL) so the same build can
// point at a deployed backend; falls back to local dev.
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Attach the auth token automatically to every request when present, so
// individual services don't have to wire up headers by hand.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token has expired or is invalid, clear it and send the user to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Avoid redirect loops if we're already on the login page.
      if (!window.location.pathname.startsWith("/login")) {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
