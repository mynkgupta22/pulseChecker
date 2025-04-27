import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ActivitySimulator from "./ActivitySimulator";
import ActivityChart from "./ActivityChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const DEFAULT_METRICS = [
  { name: "Messages", value: 0 },
  { name: "Commits", value: 0 },
  { name: "Pull Requests", value: 0 },
  { name: "Help Requests", value: 0 },
];

const TeamMetrics = ({ teamActivity, dayWise }) => {
  const [currentMetrics, setCurrentMetrics] = useState(DEFAULT_METRICS);

  useEffect(() => {
    if (teamActivity) {
      const metrics = [
        {
          name: "Messages",
          value: teamActivity.messageCount || 0,
        },
        {
          name: "Commits",
          value: teamActivity.commitCount || 0,
        },
        {
          name: "Pull Requests",
          value: teamActivity.prCount || 0,
        },
        {
          name: "Help Requests",
          value: teamActivity.helpCount || 0,
        },
      ];

      console.log(metrics, "ffff");

      setCurrentMetrics(metrics);
    }
  }, [teamActivity, dayWise]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Activity Chart */}
      <Card className="col-span-2">
        <ActivityChart dayWise={dayWise} />
      </Card>

      {/* Team Activity Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Daily Activity Trend</CardTitle>
          <CardDescription>Activity breakdown by day</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={dayWise}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="messageCount" name="Messages" fill="#0088FE" />
                <Bar dataKey="commitCount" name="Commits" fill="#00C49F" />
                <Bar dataKey="prCount" name="Pull Requests" fill="#FFBB28" />
                <Bar dataKey="blockerCount" name="Blockers" fill="#FF8042" />
                <Bar dataKey="helpCount" name="Help Requests" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Activity Distribution */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Activity Distribution</CardTitle>
          <CardDescription>Breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={currentMetrics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => {
                    const total = currentMetrics.reduce(
                      (sum, item) => sum + item.value,
                      0
                    );
                    const percentage = total ? (value / total) * 100 : 0;
                    return `${name} (${percentage.toFixed(1)}%)`;
                  }}
                >
                  {currentMetrics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Team Pulse */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Team Pulse</CardTitle>
          <CardDescription>Overall team engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={
                  dayWise
                    ? dayWise?.map((day) => ({
                        ...day,
                        activities:
                          (day.messageCount || 0) +
                          (day.commitCount || 0) +
                          (day.prCount || 0) +
                          (day.blockerCount || 0) +
                          (day.helpCount || 0),
                      }))
                    : []
                }
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="activities"
                  name="Total Activities"
                  fill="#8884d8"
                  stroke="#8884d8"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMetrics;
