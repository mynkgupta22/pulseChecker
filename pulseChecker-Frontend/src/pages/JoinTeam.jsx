import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoinTeam } from "../hooks/useTeam";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Users } from "lucide-react";
import DashboardHeader from "../components/layout/DashboardHeader";

const JoinTeam = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  const joinTeam = useJoinTeam();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const team = await joinTeam.mutateAsync(inviteCode);
      navigate(`/team/${team.id}`);
    } catch (error) {
      console.error("Failed to join team:", error);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Join Team"
        description="Join an existing team using an invite code"
      />
      <div className="p-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Join a Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <Input
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter the team's invite code"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={joinTeam.isPending}
              >
                {joinTeam.isPending ? "Joining..." : "Join Team"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinTeam;
