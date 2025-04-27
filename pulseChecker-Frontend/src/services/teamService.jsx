import axios from "axios";
import { API_BASE_URL } from "../config";

const teamService = {
  getTeamUsers: async (teamId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teams/${teamId}/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching team users:", error);
      throw error;
    }
  },

  removeTeamUser: async (teamId, userEmail) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/teams/${teamId}/users/${userEmail}`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing team user:", error);
      throw error;
    }
  },

  inviteTeamMembers: async (teamId, emails) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/invite-users`,
        {
          usersEmail: emails,
          teamId: teamId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error inviting team members:", error);
      throw error;
    }
  },
};

export default teamService;
