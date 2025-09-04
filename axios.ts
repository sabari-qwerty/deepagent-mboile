import axios from "axios";
import { config } from "./config";
import { Storage, StorageKeys } from "./lib/utils/storage";
const api = axios.create({
  baseURL: config.BackendUrl,
  timeout: 8000, // Increased timeout to 30 seconds for better mobile network handling
  headers: {
    "Content-Type": "application/json",
  },
  // Add retry configuration for better mobile network handling
  maxRedirects: 3,
  validateStatus: (status) => {
    return status >= 200 && status < 300; // Only accept 2xx status codes
  },
});

api.interceptors.request.use(
  async (config) => {
    const startTime = Date.now();
    try {
      const token = await Storage.get(StorageKeys.accessToken);

      const activeWorkspaceId = await Storage.get(
        StorageKeys.activeWorkspaceId
      );

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (activeWorkspaceId) {
        config.headers["x-knowledgeBaseId"] = String(activeWorkspaceId);
      }

      // Don't override Content-Type for FormData requests
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      console.log("🚀 REQUEST:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        timestamp: new Date().toISOString(),
        startTime,
        token: token ? "present" : "missing",
        id: activeWorkspaceId ? "present" : "missing",
      });

      // Add timing to config for response interceptor
      (config as any).startTime = startTime;

      return config;
    } catch (error) {
      console.error("❌ Request interceptor error:", error);
      return config;
    }
  },
  (error) => {
    console.error("❌ Request setup error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    const endTime = Date.now();
    const duration = endTime - (response.config as any).startTime;

    console.log("✅ RESPONSE:", {
      status: response.status,
      url: response.config.url,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("❌ RESPONSE ERROR:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
      code: error.code,
      isTimeout: error.code === "ECONNABORTED",
      isNetworkError: error.message === "Network Error",
      timeout: error.config?.timeout,
      baseURL: error.config?.baseURL,
      method: error.config?.method,
      headers: error.config?.headers,
      fullError: JSON.stringify(error, null, 2),
    });

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await Storage.remove(StorageKeys.accessToken);

      try {
        // Clear stored token
        await Storage.remove(StorageKeys.accessToken);

        // Redirect to login or refresh token logic here
        console.log("Token expired, redirecting to login...");

        // You can add navigation logic here if needed
        // navigation.navigate('login');
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
      }
    }

    // Handle timeout errors
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - the server took too long to respond");
    }
    // Handle network errors
    else if (error.message === "Network Error") {
      console.error("Network error - please check your internet connection");
    }
    // Handle other errors
    else if (error.response) {
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Network error:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
