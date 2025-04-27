import React, { useState, useEffect } from "react";
import TeamList from "../components/teams/TeamList";
import DashboardLayout from "../components/layout/DashboardLayout";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Load teams from localStorage
    const storedTeams = JSON.parse(localStorage.getItem("mockTeams") || "[]");
    setTeams(storedTeams);
  }, []);

  return (
    <DashboardLayout
      userName="John Doe"
      userEmail="john.doe@example.com"
      onLogout={() => {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";
      }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Teams</h1>
        <p className="text-muted-foreground">
          Manage and view all your teams in one place
        </p>
      </div>
      <TeamList teams={teams} />
    </DashboardLayout>
  );
};

export default Teams;
