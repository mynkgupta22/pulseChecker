import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import teamService from "../services/teamService";
import { useAuth } from "../contexts/hooks";
import { Code } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("create");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teamCode: "",
    type: "development", // Default team type
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await teamService.createTeam({
        name: formData.name,
        description: formData.description,
        type: formData.type,
      });

      if (res) {
        // Update user's firstLogin status
        const updatedUser = { ...user, firstLogin: false };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        toast.success("Team created successfully!");
        navigate("/teams");
      }
    } catch (error) {
      console.error("Team creation error:", error);
      toast.error(error.message || "Failed to create team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await teamService.joinTeam(formData.teamCode);
      toast.success("Joined team successfully!");
      navigate("/teams");
    } catch (error) {
      toast.error(error.message || "Failed to join team");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F2C]">
            Welcome to PulseCheck
          </h1>
          <p className="text-gray-600 mt-2">Let's get you set up with a team</p>
        </div>

        <Card className="p-6">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === "create" ? "default" : "ghost"}
              className={`flex-1 ${
                activeTab === "create" ? "bg-[#9b87f5] hover:bg-[#8b77e5]" : ""
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Team
            </Button>
            <Button
              variant={activeTab === "join" ? "default" : "ghost"}
              className={`flex-1 ${
                activeTab === "join" ? "bg-[#9b87f5] hover:bg-[#8b77e5]" : ""
              }`}
              onClick={() => setActiveTab("join")}
            >
              Join Team
            </Button>
          </div>

          {activeTab === "create" ? (
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter team name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Team Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter team description"
                  value={formData.description}
                  onChange={handleChange}
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
          ) : (
            <form onSubmit={handleJoinTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamCode">Team Code</Label>
                <Input
                  id="teamCode"
                  name="teamCode"
                  type="text"
                  placeholder="Enter team code"
                  value={formData.teamCode}
                  onChange={handleChange}
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
          )}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
