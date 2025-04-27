import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../ui/card";

const DashboardHeader = ({ title, description }) => {
  const location = useLocation();
  const isTeamPage = location.pathname.includes("/team/");

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
