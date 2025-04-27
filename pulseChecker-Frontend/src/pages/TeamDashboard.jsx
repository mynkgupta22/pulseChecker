import React, { useEffect, useState } from "react";
import TeamMetrics from "../components/charts/TeamMetrics";
import TeamWorkspace from "../components/teams/TeamWorkspace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import authService from "../services/authService";
import teamService from "../services/teamService";
import { format, subWeeks } from "date-fns";

const TeamDashboard = () => {
  const [activityData, setActivityData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamUsers, setTeamUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team details
        const teamDetails = await teamService.getTeamDetails();
        setTeams(teamDetails);

        // Fetch team users if a team is selected
        if (selectedTeam) {
          const users = await teamService.getTeamUsers(selectedTeam);
          setTeamUsers(users);
        }

        // Fetch activities
        const currentDate = new Date();
        const lastWeekDate = subWeeks(currentDate, 1);

        const payload = {
          startDate: format(lastWeekDate, "dd-MM-yyyy"),
          endDate: format(currentDate, "dd-MM-yyyy"),
          userId: selectedUser,
          teamId: selectedTeam,
        };
        if (!payload.userId) {
          delete payload.userId;
        }

        // Fetch both dashboard data and detailed team activity
        const [dashboardRes, detailedRes] = await Promise.all([
          authService.getDashboardData(payload),
          authService.getTeamDetailedCount(payload),
        ]);

        setActivityData({
          data: dashboardRes || {},
          detailedData: detailedRes || [],
          collaborationTrends: {
            name: "Current Period",
            messages: dashboardRes?.messageCount || 0,
            commits: dashboardRes?.commitCount || 0,
            prs: dashboardRes?.prCount || 0,
            blockers: dashboardRes?.blockerCount || 0,
            help: dashboardRes?.helpCount || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedTeam, selectedUser]);

  return (
    <div className="container mx-auto ">
      <div className="flex justify-end my-2">
        <div className="flex justify-end mr-2">
          <Select
            value={selectedTeam}
            onValueChange={(value) => {
              setSelectedTeam(value || teams?.[0]?.teamId);
              setSelectedUser(""); // Reset user selection when team changes
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.teamId} value={team.teamId}>
                  {team.teamName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end mr-2">
          <Select
            value={selectedUser}
            onValueChange={setSelectedUser}
            disabled={!selectedTeam}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
            <SelectContent>
              {teamUsers?.teamUserResponseList?.map((user) => (
                <SelectItem key={user.email} value={user.userId}>
                  {user.firstName} {user.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <TeamWorkspace trends={activityData.collaborationTrends} />

      <TeamMetrics
        teamActivity={activityData?.data}
        dayWise={activityData?.detailedData}
      />
    </div>
  );
};

export default TeamDashboard;
