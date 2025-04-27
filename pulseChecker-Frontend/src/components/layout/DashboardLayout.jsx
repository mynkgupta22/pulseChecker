import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../../contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Mock data - replace with actual API call
const mockTeams = [
  { id: "1", name: "Frontend Team" },
  { id: "2", name: "Backend Team" },
  { id: "3", name: "Design Team" },
  { id: "4", name: "QA Team" },
];

const DashboardLayout = () => {
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0].id);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar
          userName="Mayank Agarwal"
          userEmail="mayank@example.com"
          onLogout={() => console.log("Logout")}
        >
          <div className="flex items-center gap-4">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-[200px]">
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
          </div>
        </Navbar>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Outlet context={{ selectedTeam }} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
