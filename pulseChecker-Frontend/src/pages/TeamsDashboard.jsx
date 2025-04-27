import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Activity, Users, Clock, TrendingUp } from "lucide-react";
import TeamWorkspace from "../components/teams/TeamWorkspace";
import TeamPulse from "../components/teams/TeamPulse";
import TeamDashboard from "./TeamDashboard";

// Mock data - replace with actual API call
const mockTeams = [
  {
    id: "1",
    name: "Frontend Team",
    stats: {
      members: 8,
      activeProjects: 3,
      avgResponseTime: "2.5h",
      productivity: "85%",
    },
  },
  {
    id: "2",
    name: "Backend Team",
    stats: {
      members: 6,
      activeProjects: 4,
      avgResponseTime: "3.2h",
      productivity: "78%",
    },
  },
  {
    id: "3",
    name: "Design Team",
    stats: {
      members: 5,
      activeProjects: 2,
      avgResponseTime: "4.1h",
      productivity: "92%",
    },
  },
  {
    id: "4",
    name: "QA Team",
    stats: {
      members: 4,
      activeProjects: 3,
      avgResponseTime: "1.8h",
      productivity: "88%",
    },
  },
];

const TeamsDashboard = () => {
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0].id);
  const selectedTeamData = mockTeams.find((team) => team.id === selectedTeam);

  return (
    <div className="space-y-6">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team Analytics</h1>
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {mockTeams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedTeamData.stats.members}
            </div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedTeamData.stats.activeProjects}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedTeamData.stats.avgResponseTime}
            </div>
            <p className="text-xs text-muted-foreground">To messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedTeamData.stats.productivity}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div> */}

      {/* <TeamPulse /> */}
   
      <TeamDashboard />
    </div>
  );
};

export default TeamsDashboard;
