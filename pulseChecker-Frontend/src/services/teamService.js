import { api } from "./authService";

const API_BASE_URL = "http://192.168.1.2:8081";

const teamService = {
  async createTeam(teamData) {
    try {
      const response = await api.post("/register-team", teamData);
      return response.data;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error.response?.data || error.message;
    }
  },

  async joinTeam(teamCode) {
    try {
      const response = await api.post(`/join-team/${teamCode}`);
      return response.data;
    } catch (error) {
      console.error("Error joining team:", error);
      throw error.response?.data || error.message;
    }
  },

  async getTeams() {
    try {
      const response = await api.get("/users/get-team-details");
      return response.data;
    } catch (error) {
      console.error("Error getting teams:", error);
      throw error.response?.data || error.message;
    }
  },

  getTeamDetails: async () => {
    try {
      const response = await api.get(`/users/get-team-details`);
      return response.data;
    } catch (error) {
      console.error("Error fetching team details:", error);
      throw error.response?.data || error.message;
    }
  },

  getTeamUsers: async (teamId) => {
    try {
      const response = await api.get(`/team/${teamId}/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching team users:", error);
      throw error.response?.data || error.message;
    }
  },

  inviteMembers: async (teamId, emails) => {
    try {
      const response = await api.post(`/team/${teamId}/invite`, { emails });
      return response.data;
    } catch (error) {
      console.error("Error inviting members:", error);
      throw error.response?.data || error.message;
    }
  },

  removeMember: async (teamId, userId) => {
    try {
      const response = await api.delete(`/team/${teamId}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing member:", error);
      throw error.response?.data || error.message;
    }
  },
};

export default teamService;
