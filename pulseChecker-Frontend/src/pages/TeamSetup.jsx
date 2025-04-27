import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

const TeamSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      const newTeam = {
        id: Math.floor(Math.random() * 1000),
        name: teamName,
        description: "New team created",
        members: 1,
        projects: 0,
        lastActivity: "Just now",
        status: "active",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${teamName}`,
      };

      // In a real app, this would be handled by a state management solution
      const existingTeams = JSON.parse(
        localStorage.getItem("mockTeams") || "[]"
      );
      localStorage.setItem(
        "mockTeams",
        JSON.stringify([...existingTeams, newTeam])
      );

      toast({
        title: "Team created",
        description: `Team "${teamName}" has been created successfully.`,
      });
      navigate("/teams");
    }, 1000);
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      if (inviteCode === "DEMO123") {
        toast({
          title: "Team joined",
          description: "You have successfully joined the team.",
        });
        navigate("/teams");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "The invite code you entered is invalid.",
        });
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome to Pulse Checker
        </h2>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="create">Create Team</TabsTrigger>
            <TabsTrigger value="join">Join Team</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Team"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="join">
            <form onSubmit={handleJoinTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <Input
                  id="inviteCode"
                  placeholder="Enter invite code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join Team"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              Demo invite code: DEMO123
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TeamSetup;
