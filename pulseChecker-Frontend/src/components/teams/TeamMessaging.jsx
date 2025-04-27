import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Send,
  Paperclip,
  Smile,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  AlertTriangle,
  UserPlus,
  X,
  UserMinus,
  HelpCircle,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import teamService from "../../services/teamService";
import activityService from "../../services/activityService";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, subDays } from "date-fns";

const TeamMessaging = () => {
  const { teamId } = useParams();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("SLACK_MESSAGE");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [isSendingInvites, setIsSendingInvites] = useState(false);
  const [isRemoveMemberModalOpen, setIsRemoveMemberModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [isRemovingMember, setIsRemovingMember] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [startDate, setStartDate] = useState(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getTeamActivities(
          teamId,
          startDate ? format(startDate, "dd-MM-yyyy") : null,
          endDate ? format(endDate, "dd-MM-yyyy") : null
        );
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        toast.error("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [teamId, selectedUserId, startDate, endDate]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await activityService.addActivity({
        type: messageType,
        description: message,
        teamId: parseInt(teamId),
      });

      // Use current date filters or defaults when refetching
      const currentStartDate = startDate || subDays(new Date(), 7);
      const currentEndDate = endDate || new Date();

      const data = await activityService.getUserActivities(
        selectedUserId,
        format(currentStartDate, "dd-MM-yyyy"),
        format(currentEndDate, "dd-MM-yyyy")
      );
      setActivities(data);

      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    }
  };

  const handleEmailInput = (e) => {
    const value = e.target.value;
    setEmailInput(value);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      emailInput === "" &&
      invitedEmails.length > 0
    ) {
      // Remove the last email when backspace is pressed on empty input
      setInvitedEmails(invitedEmails.slice(0, -1));
    } else if ((e.key === "Enter" || e.key === " ") && emailInput.trim()) {
      e.preventDefault();
      const email = emailInput.trim();
      if (isValidEmail(email)) {
        setInvitedEmails([...invitedEmails, email]);
        setEmailInput("");
      }
    }
  };

  // private List<String> usersEmail;
  // private Long teamId;

  const removeEmail = (emailToRemove) => {
    setInvitedEmails(invitedEmails.filter((email) => email !== emailToRemove));
  };

  const handleSendInvites = async () => {
    console.log(teamService, "dddd");
    if (invitedEmails.length === 0) return;

    setIsSendingInvites(true);

    try {
      await teamService.inviteMembers(teamId, invitedEmails);
      toast.success("Invites sent successfully!");
      setIsInviteModalOpen(false);
      setInvitedEmails([]);
    } catch (error) {
      console.error("Failed to send invites:", error);
      toast.error(error.message || "Failed to send invites");
    } finally {
      setIsSendingInvites(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case "COMMIT":
        return <GitCommit className="h-4 w-4" />;
      case "PULL_REQUEST_CREATED":
        return <GitPullRequest className="h-4 w-4" />;
      case "PULL_REQUEST_MERGED":
        return <GitPullRequest className="h-4 w-4" />;
      case "BLOCKER":
        return <AlertTriangle className="h-4 w-4" />;
      case "HELP":
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;

    setIsRemovingMember(true);
    try {
      // TODO: Implement API call to remove member
      await teamService.removeMember(teamId, memberToRemove.id);
      toast.success("Member removed successfully");
      setIsRemoveMemberModalOpen(false);
      setMemberToRemove(null);
    } catch (error) {
      console.error("Failed to remove member:", error);
      toast.error(error.message || "Failed to remove member");
    } finally {
      setIsRemovingMember(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <Card className="bg-card h-[calc(100vh-200px)] flex flex-col">
      <CardHeader className="border-b flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Team Activities</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-black">
                      {getInitials(activity?.firstName, activity?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {activity?.firstName + " " + activity?.lastName ||
                          "Unknown User"}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getMessageTypeIcon(activity.type)}
                        <span className="capitalize">
                          {activity.type.toLowerCase().replace(/_/g, " ")}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No activities yet
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {getMessageTypeIcon(messageType)}
                    <span className="capitalize">
                      {messageType.toLowerCase().replace(/_/g, " ")}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SLACK_MESSAGE">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Slack Message</span>
                  </div>
                </SelectItem>
                <SelectItem value="COMMIT">
                  <div className="flex items-center gap-2">
                    <GitCommit className="h-4 w-4" />
                    <span>Commit</span>
                  </div>
                </SelectItem>
                <SelectItem value="PULL_REQUEST_CREATED">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="h-4 w-4" />
                    <span>Pull Request Created</span>
                  </div>
                </SelectItem>
                <SelectItem value="PULL_REQUEST_MERGED">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="h-4 w-4" />
                    <span>Pull Request Merged</span>
                  </div>
                </SelectItem>
                <SelectItem value="BLOCKER">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Blocker</span>
                  </div>
                </SelectItem>
                <SelectItem value="HELP">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="w-full relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 max-h-[120px] resize-none overflow-y-auto"
                style={{ whiteSpace: "pre-wrap" }}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Send className="h-8 w-10" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

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

      {/* Remove Member Confirmation Dialog */}
      <Dialog
        open={isRemoveMemberModalOpen}
        onOpenChange={setIsRemoveMemberModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.name} from the
              team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRemoveMemberModalOpen(false);
                setMemberToRemove(null);
              }}
              disabled={isRemovingMember}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemoveMember}
              disabled={isRemovingMember}
            >
              {isRemovingMember ? "Removing..." : "Remove Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TeamMessaging;
