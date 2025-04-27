import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Users, Activity, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import teamService from "../../services/teamService";
import { toast } from "sonner";

const MyTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const response = await teamService.getTeams();
      setTeams(response);

      // Fetch details for each team
      const detailsPromises = response.map((team) =>
        teamService.getTeamDetails(team.id)
      );
      const details = await Promise.all(detailsPromises);

      // Create a map of team details
      const detailsMap = details.reduce((acc, detail) => {
        acc[detail.id] = detail;
        return acc;
      }, {});

      setTeamDetails(detailsMap);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      toast.error("Failed to load teams");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleManageTeam = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const formatLastActivity = (dateString) => {
    if (!dateString) return "No activity";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / 36e5;

    if (diffInHours < 1) {
      return "Less than an hour ago";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">My Teams</h2>
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            You haven't joined any teams yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => {
            const details = teamDetails[team.id] || {};
            return (
              <Card key={team.id} className="bg-card text-card-foreground">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {team.name}
                    </CardTitle>
                    <Badge
                      variant={
                        team.status === "active" ? "default" : "secondary"
                      }
                      className="bg-primary/10 text-primary"
                    >
                      {details.role || "Member"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {team.description}
                  </p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{details.memberCount || 0} members</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Activity className="h-4 w-4 mr-1" />
                      <span>{details.projectCount || 0} projects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Last activity: {formatLastActivity(details.lastActivity)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageTeam(team.id)}
                    >
                      <Settings2 className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTeams;
