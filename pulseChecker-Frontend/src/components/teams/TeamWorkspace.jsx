import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GitBranch, MessageSquare, Users } from "lucide-react";

const TeamWorkspace = ({ trends = {} }) => {
  return (
    <div className="space-y-6 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Collaboration Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <GitBranch className="h-4 w-4" />
                <h3 className="text-sm font-medium">Commits</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">{trends?.commits || 0}</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <h3 className="text-sm font-medium">Messages</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">{trends?.messages || 0}</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <h3 className="text-sm font-medium">Code Reviews</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">{trends?.prs || 0}</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamWorkspace;
