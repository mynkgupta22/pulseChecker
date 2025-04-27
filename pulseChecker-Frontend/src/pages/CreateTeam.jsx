import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTeam } from "../hooks/useTeam";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { PlusCircle } from "lucide-react";
import DashboardHeader from "../components/layout/DashboardHeader";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [creator, setCreator] = useState("");
  const createTeam = useCreateTeam();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTeam = await createTeam.mutateAsync({
        name: teamName,
        creator: creator,
      });
      navigate(`/team/${newTeam.id}`);
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Create Team"
        description="Start a new team and invite members"
      />
      <div className="p-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-6 w-6" />
              Create New Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creator">Your Name</Label>
                <Input
                  id="creator"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createTeam.isPending}
              >
                {createTeam.isPending ? "Creating..." : "Create Team"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTeam;
