import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Users, Activity, Settings2, UserPlus, X } from "lucide-react";
import TeamMessaging from "../components/teams/TeamMessaging";
import teamService from "../services/teamService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { AuthContext } from "../contexts/hooks";

const TeamPage = () => {
  const { teamId } = useParams();
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [isSendingInvites, setIsSendingInvites] = useState(false);

  const [isTeamCreator, setIsTeamCreator] = useState(false);

  const fetchTeamDetails = async () => {
    try {
      const teamDetailsResponse = await teamService.getTeamDetails();
      console.log('Team Details Response:', teamDetailsResponse);
      // The response might be an array of teams
      const teams = Array.isArray(teamDetailsResponse) ? teamDetailsResponse : [teamDetailsResponse];
      // Convert teamId from URL to number for comparison
      const currentTeamId = parseInt(teamId, 10);
      console.log('Current Team ID:', currentTeamId);
      const teamDetails = teams.find(team => team.teamId === currentTeamId || team.id === currentTeamId);
      console.log('Found Team Details:', teamDetails);
      // Check all possible property names for team creator status
      const isCreator = teamDetails?.creator || teamDetails?.teamCreator || teamDetails?.isTeamCreator || false;
      console.log('Is Team Creator:', isCreator);
      setIsTeamCreator(isCreator);
    } catch (error) {
      console.error("Error fetching team details:", error);
      toast.error("Failed to load team details");
    }
  };

  const fetchTeamUsers = async () => {
    try {
      const response = await teamService.getTeamUsers(teamId);
      setTeam({
        name: response.teamName,
        teamId: response.teamId,
        totalUserCount: response.totalUserCount,
        members: response.teamUserResponseList.map((member) => ({
          name: `${member.firstName} ${member.lastName}`,
          email: member.email,
          avatar: `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}`,
        })),
      });
    } catch (error) {
      console.error("Error fetching team users:", error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamUsers();
    fetchTeamDetails();
  }, [teamId]);

  const handleRemoveClick = (member) => {
    if (member.email === user?.email) {
      toast.error("You cannot remove yourself from the team");
      return;
    }
    setMemberToRemove(member);
    setIsRemoveDialogOpen(true);
  };

  const handleRemoveConfirm = async () => {
    if (!memberToRemove) return;

    if (memberToRemove.email === user?.email) {
      toast.error("You cannot remove yourself from the team");
      setIsRemoveDialogOpen(false);
      setMemberToRemove(null);
      return;
    }

    setIsRemoving(true);
    try {
      await teamService.removeMember(teamId, memberToRemove.email);
      toast.success("Member removed successfully");
      await fetchTeamUsers();
    } catch (error) {
      console.error("Error removing team member:", error);
      toast.error("Failed to remove team member");
    } finally {
      setIsRemoving(false);
      setIsRemoveDialogOpen(false);
      setMemberToRemove(null);
    }
  };

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const email = emailInput.trim();
      if (email && !invitedEmails.includes(email)) {
        setInvitedEmails([...invitedEmails, email]);
        setEmailInput("");
      }
    }
  };

  const removeEmail = (email) => {
    setInvitedEmails(invitedEmails.filter((e) => e !== email));
  };

  const handleSendInvites = async () => {
    if (invitedEmails.length === 0) return;

    setIsSendingInvites(true);
    try {
      await teamService.inviteMembers(teamId, invitedEmails);
      toast.success("Invites sent successfully");
      setInvitedEmails([]);
      setEmailInput("");
      setIsInviteModalOpen(false);
      await fetchTeamUsers();
    } catch (error) {
      console.error("Error sending invites:", error);
      toast.error("Failed to send invites");
    } finally {
      setIsSendingInvites(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!team) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Team Info */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{team.name}</CardTitle>
              <Badge className="bg-primary/10 text-primary">
                {team.totalUserCount} members
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{team.totalUserCount} members</span>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Team Members</CardTitle>
              {isTeamCreator && (
                <Button
                  size="sm"
                  onClick={() => setIsInviteModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {team.members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                {isTeamCreator && user?.email !== member.email && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveClick(member)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Team Chat */}
      <div className="lg:col-span-2">
        <TeamMessaging teamId={teamId} />
      </div>

      {/* Remove Member Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="remove-member-description">
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <div id="remove-member-description">
              Are you sure you want to remove {memberToRemove?.name} from the team?
            </div>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to remove {memberToRemove?.name} from the
              team?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRemoveDialogOpen(false)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemoveConfirm}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
              {invitedEmails.map((email) => (
                <Badge
                  key={email}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {email}
                  <button
                    onClick={() => removeEmail(email)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Input
                value={emailInput}
                onChange={handleEmailInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter email addresses..."
                className="flex-1 min-w-[200px] border-0 focus-visible:ring-0"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Type email addresses and press enter or space to add them
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendInvites}
              disabled={invitedEmails.length === 0 || isSendingInvites}
            >
              {isSendingInvites ? "Sending..." : "Send Invites"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamPage;
