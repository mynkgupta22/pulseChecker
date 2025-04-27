import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner";

const TeamList = () => {
  const [teams, setTeams] = useState([
    {
      id: "1",
      name: "Frontend Team",
      description: "Working on the frontend of the application",
      members: 5,
    },
    {
      id: "2",
      name: "Backend Team",
      description: "Working on the backend of the application",
      members: 4,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeam = () => {
    navigate("/team-setup");
  };

  const handleJoinTeam = () => {
    toast.info("Team joining functionality coming soon!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Teams</h1>
        <div className="flex gap-4">
          <Button onClick={handleCreateTeam}>Create Team</Button>
          <Button variant="outline" onClick={handleJoinTeam}>
            Join Team
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card
            key={team.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/team/${team.id}`)}
          >
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{team.description}</p>
              <p className="text-sm text-gray-500">
                {team.members} {team.members === 1 ? "member" : "members"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
