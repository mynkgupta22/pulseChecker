import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  Calendar,
  MessageSquare,
  UserPlus,
  UserCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import teamService from "../../services/teamService";
import { toast } from "sonner";

const Sidebar = () => {
  const location = useLocation();
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(teams, "fff");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamData = await teamService.getTeamDetails();
        setTeams(teamData);
      } catch (error) {
        toast.error("Failed to load teams");
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/teams",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Team",
      href: "/team-setup",
      icon: UserPlus,
    },
  ];

  return (
    <aside className="w-64 border-r bg-background p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}

        {/* My Teams Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsTeamsOpen(!isTeamsOpen)}
            className={cn(
              "flex items-center justify-between w-full gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              "text-muted-foreground hover:bg-muted"
            )}
          >
            <div className="flex items-center gap-3">
              <UserCheck className="h-4 w-4" />
              My Teams
            </div>
            {isTeamsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isTeamsOpen && (
            <div className="pl-6 space-y-1">
              {loading ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Loading teams...
                </div>
              ) : teams.length > 0 ? (
                teams.map((team) => (
                  <Link
                    key={team.teamId}
                    to={`/team/${team.teamId}`}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      location.pathname === `/team/${team.id}`
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <div>
                      <span>{team.teamName}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No teams found
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
