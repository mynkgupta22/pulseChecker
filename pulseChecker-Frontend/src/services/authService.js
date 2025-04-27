import axios from "axios";

const API_URL = "https://pulsechecker.duckdns.org"; // Update this with your Spring Boot backend URL

// Create an axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const authService = {
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post("/authenticate", {
        email,
        password,
      });
      const { token, firstLogin, ...userData } = response.data;

      if (token) {
        const userDataToStore = { token, firstLogin, ...userData };
        localStorage.setItem("user", JSON.stringify(userDataToStore));
        authService.setAuthToken(token);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post("/users/add-user", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Signup failed" };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    authService.setAuthToken(null);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Add new methods for profile management
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/profile", profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Profile update failed" };
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.put("/profile/password", passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Password change failed" };
    }
  },

  getDashboardData: async ({ startDate, userId, teamId, endDate }) => {
    try {
      const response = await api.get(
        `/activity/${teamId || 0}/detailed-count`,
        {
          params: {
            startDate,
            userId,
            endDate,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Password change failed" };
    }
  },

  getTeamDetailedCount: async ({ startDate, userId, teamId, endDate }) => {
    try {
      const response = await api.get(
        `${API_URL}/activity-day-wise/${teamId || 0}/detailed-count`,
        {
          params: {
            userId,
            startDate,
            endDate,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },
};

export default authService;
