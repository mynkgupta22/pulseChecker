import { subDays, format } from "date-fns";

// Mock teams data
export const mockTeams = [
  {
    id: "1",
    name: "Frontend Team",
    description: "Working on React and UI components",
    members: [
      { id: "1", name: "John Doe", role: "Lead" },
      { id: "2", name: "Jane Smith", role: "Developer" },
      { id: "3", name: "Mike Johnson", role: "Developer" },
    ],
  },
  {
    id: "2",
    name: "Backend Team",
    description: "Handling API and database operations",
    members: [
      { id: "4", name: "Sarah Wilson", role: "Lead" },
      { id: "5", name: "David Brown", role: "Developer" },
      { id: "6", name: "Emily Davis", role: "Developer" },
    ],
  },
  {
    id: "3",
    name: "DevOps Team",
    description: "Managing infrastructure and deployments",
    members: [
      { id: "7", name: "Alex Turner", role: "Lead" },
      { id: "8", name: "Lisa Chen", role: "Engineer" },
      { id: "9", name: "Tom Harris", role: "Engineer" },
    ],
  },
];

// Generate mock activity data for the last 30 days
const generateActivityData = (teamId, days = 30) => {
  const activities = [];
  const baseActivity = {
    meetings: 0,
    documents: 0,
    codeCommits: 0,
    reviews: 0,
  };

  for (let i = 0; i < days; i++) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();

    // Generate random activity counts based on day of week
    const activity = {
      date: format(date, "yyyy-MM-dd"),
      activities: Math.floor(Math.random() * 20) + 5, // 5-25 activities per day
      ...baseActivity,
      meetings: Math.floor(Math.random() * 3) + (dayOfWeek === 1 ? 2 : 0), // More meetings on Monday
      documents: Math.floor(Math.random() * 5) + 1,
      codeCommits:
        Math.floor(Math.random() * 10) +
        (dayOfWeek !== 0 && dayOfWeek !== 6 ? 3 : 0), // More commits on weekdays
      reviews: Math.floor(Math.random() * 4) + 1,
    };
    activities.push(activity);
  }

  return activities.reverse(); // Return in chronological order
};

// Generate mock metrics data
const generateMetricsData = (teamId) => {
  return {
    totalActivity: Math.floor(Math.random() * 500) + 200,
    activeMembers: Math.floor(Math.random() * 5) + 3,
    averageDailyActivity: Math.floor(Math.random() * 15) + 5,
    activityByCategory: [
      { name: "Meetings", count: Math.floor(Math.random() * 50) + 20 },
      { name: "Documents", count: Math.floor(Math.random() * 100) + 30 },
      { name: "Code Commits", count: Math.floor(Math.random() * 200) + 50 },
      { name: "Reviews", count: Math.floor(Math.random() * 40) + 10 },
    ],
  };
};

// Mock service methods
export const mockDataService = {
  getTeams: () => Promise.resolve(mockTeams),
  getTeam: (teamId) =>
    Promise.resolve(mockTeams.find((team) => team.id === teamId)),
  getTeamActivity: (teamId, days) =>
    Promise.resolve(generateActivityData(teamId, days)),
  getTeamMetrics: (teamId) => Promise.resolve(generateMetricsData(teamId)),
  getMemberActivity: (teamId, memberId, days) => {
    const teamActivity = generateActivityData(teamId, days);
    // Simulate individual member activity (roughly 1/3 of team activity)
    return Promise.resolve(
      teamActivity.map((day) => ({
        ...day,
        activities:
          Math.floor(day.activities / 3) + Math.floor(Math.random() * 3),
      }))
    );
  },
};
