import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PlusCircle, Users, X, UserPlus } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import teamService from "../../services/teamService";
import { useNavigate } from "react-router-dom";

const TeamSetup = ({ onTeamCreated }) => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && emailInput.trim()) {
      e.preventDefault();
      const email = emailInput.trim();
      if (isValidEmail(email)) {
        setInvitedEmails([...invitedEmails, email]);
        setEmailInput("");
      }
    }
  };

  const removeEmail = (emailToRemove) => {
    setInvitedEmails(invitedEmails.filter((email) => email !== emailToRemove));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    setIsCreatingTeam(true);
    try {
      const teamData = {
        name: teamName,
        description: teamDescription,
        members: invitedEmails,
      };

      const newTeam = await teamService.createTeam(teamData);
      toast.success("Team created successfully!");

      // Send invites to members
      if (invitedEmails.length > 0) {
        await teamService.inviteMembers(newTeam.id, invitedEmails);
        toast.success("Invites sent successfully!");
      }

      // Reset form
      setTeamName("");
      setTeamDescription("");
      setInvitedEmails([]);

      // Call the callback to refetch team list
      if (onTeamCreated) {
        await onTeamCreated();
      }

      // Navigate to the new team page
      navigate(`/teams`);
    } catch (error) {
      console.error("Failed to create team:", error);
      toast.error(error.message || "Failed to create team");
    } finally {
      setIsCreatingTeam(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Team Setup</h2>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleCreateTeam}
          disabled={isCreatingTeam}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {isCreatingTeam ? "Creating Team..." : "Create New Team"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Team Information */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Team Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                placeholder="Enter team description"
                rows={3}
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamSetup;
