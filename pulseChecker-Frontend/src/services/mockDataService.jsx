// Mock data for teams
const mockTeams = [
  {
    id: "1",
    name: "Frontend Team",
    members: ["John Doe", "Jane Smith", "Mike Johnson"],
    inviteCode: "FRONT-123",
  },
  {
    id: "2",
    name: "Backend Team",
    members: ["Alice Brown", "Bob Wilson", "Carol Davis"],
    inviteCode: "BACK-456",
  },
];

// Mock data for activity categories
const mockCategories = [
  "Commits",
  "Pull Requests",
  "Code Reviews",
  "Messages",
  "Blockers",
];

// Mock data for team activity
const generateMockActivity = (days = 30) => {
  const activities = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const dayActivities = {};
    mockCategories.forEach((category) => {
      dayActivities[category] = Math.floor(Math.random() * 20);
    });

    activities.push({
      date: date.toISOString(),
      activities: dayActivities,
    });
  }

  return activities;
};

// Mock data for team metrics
const generateMockMetrics = (teamId) => {
  const activities = generateMockActivity();
  const totalActivity = activities.reduce((sum, day) => {
    return sum + Object.values(day.activities).reduce((a, b) => a + b, 0);
  }, 0);

  return {
    totalActivity,
    activeMembers: Math.floor(Math.random() * 10) + 1,
    averageDailyActivity: Math.floor(totalActivity / 30),
    activityByType: mockCategories.reduce((acc, category) => {
      acc[category] = activities.reduce(
        (sum, day) => sum + day.activities[category],
        0
      );
      return acc;
    }, {}),
  };
};

export const mockDataService = {
  getTeams: async () => {
    return mockTeams;
  },

  getTeam: async (teamId) => {
    return mockTeams.find((team) => team.id === teamId);
  },

  createTeam: async (teamData) => {
    const newTeam = {
      id: String(mockTeams.length + 1),
      ...teamData,
      members: [teamData.creator],
      inviteCode: `TEAM-${Math.floor(Math.random() * 1000)}`,
    };
    mockTeams.push(newTeam);
    return newTeam;
  },

  joinTeam: async (inviteCode) => {
    const team = mockTeams.find((t) => t.inviteCode === inviteCode);
    if (team) {
      team.members.push("New Member");
      return team;
    }
    throw new Error("Invalid invite code");
  },

  getTeamActivity: async (teamId, days = 30) => {
    return generateMockActivity(days);
  },

  getMemberActivity: async (teamId, memberId, days = 30) => {
    return generateMockActivity(days);
  },

  getTeamMetrics: async (teamId) => {
    return generateMockMetrics(teamId);
  },

  getActivityCategories: async () => {
    return mockCategories;
  },
};
