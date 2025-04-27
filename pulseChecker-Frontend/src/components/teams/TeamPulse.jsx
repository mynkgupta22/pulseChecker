import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Activity,
  GitBranch,
  MessageSquare,
  Users,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Mock data for team pulse
const mockPulseData = {
  team: {
    name: "Frontend Team",
    members: [
      { id: 1, name: "John Doe", role: "Team Lead" },
      { id: 2, name: "Jane Smith", role: "Developer" },
      { id: 3, name: "Mike Johnson", role: "Developer" },
      { id: 4, name: "Sarah Wilson", role: "Designer" },
    ],
    activity: {
      today: {
        commits: 12,
        prs: 3,
        messages: 45,
        blockers: 2,
      },
      week: {
        commits: [12, 15, 8, 10, 14, 9, 11],
        prs: [3, 2, 4, 1, 3, 2, 4],
        messages: [45, 52, 38, 42, 48, 40, 55],
        blockers: [2, 1, 3, 2, 1, 2, 3],
      },
    },
    health: {
      energy: 85, // 0-100
      collaboration: 78,
      responsiveness: 92,
      blockers: 2,
    },
  },
};

const TeamPulse = () => {
  const [timeRange, setTimeRange] = useState("today");

  return (
    <div className="space-y-6">
      {/* Team Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Health Pulse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <h3 className="text-sm font-medium">Energy Level</h3>
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <p className="text-2xl font-bold">
                  {mockPulseData.team.health.energy}%
                </p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Based on activity patterns
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <h3 className="text-sm font-medium">Collaboration</h3>
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <p className="text-2xl font-bold">
                  {mockPulseData.team.health.collaboration}%
                </p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                PR reviews & discussions
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <h3 className="text-sm font-medium">Responsiveness</h3>
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <p className="text-2xl font-bold">
                  {mockPulseData.team.health.responsiveness}%
                </p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Message response time
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <h3 className="text-sm font-medium">Active Blockers</h3>
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <p className="text-2xl font-bold">
                  {mockPulseData.team.health.blockers}
                </p>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList>
              <TabsTrigger value="today" onClick={() => setTimeRange("today")}>
                Today
              </TabsTrigger>
              <TabsTrigger value="week" onClick={() => setTimeRange("week")}>
                This Week
              </TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Commits</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.today.commits}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Pull Requests</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.today.prs}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Messages</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.today.messages}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Blockers</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.today.blockers}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="week" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Commits</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.week.commits.reduce(
                      (a, b) => a + b,
                      0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Pull Requests</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.week.prs.reduce(
                      (a, b) => a + b,
                      0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Messages</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.week.messages.reduce(
                      (a, b) => a + b,
                      0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Blockers</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {mockPulseData.team.activity.week.blockers.reduce(
                      (a, b) => a + b,
                      0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPulse;
