import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";

// Mock data

const ActivityChart = ({ dayWise }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Team Activity Overview
      </h3>
      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dayWise || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="messageCount"
              name="Messages"
              stroke="#0088FE"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="commitCount"
              name="Commits"
              stroke="#00C49F"
            />
            <Line
              type="monotone"
              dataKey="prCount"
              name="Pull Requests"
              stroke="#FFBB28"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
