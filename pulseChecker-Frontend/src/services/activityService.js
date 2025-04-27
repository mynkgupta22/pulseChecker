import { api } from "./authService";

const activityService = {
  addActivity: async (activityData) => {
    try {
      const response = await api.post("/add-activity", activityData);
      return response.data;
    } catch (error) {
      console.error("Error adding activity:", error);
      throw error.response?.data || error.message;
    }
  },

  getTeamActivities: async (teamId, startDate, endDate) => {
    try {
      const params = new URLSearchParams();

      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await api.get(
        `/team/${teamId}/activities?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching team activities:", error);
      throw error.response?.data || error.message;
    }
  },

  getUserActivities: async (userId, startDate, endDate) => {
    try {
      const params = new URLSearchParams();
      if (userId) params.append("userId", userId);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      console.log("Fetching activities with params:", params.toString());
      const response = await api.get(`/user/activities?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user activities:", error);
      throw error.response?.data || error.message;
    }
  },
};

export default activityService;
