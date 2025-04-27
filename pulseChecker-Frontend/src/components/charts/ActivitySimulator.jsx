import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

const generateActivityData = (level) => {
  const baseActivity = {
    meetings: 0,
    documents: 0,
    codeCommits: 0,
    reviews: 0,
  };

  const activities = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Scale the activity based on the selected level (50-100)
    const scale = level / 50; // Convert 50-100 range to 1-2 scale

    const activity = {
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      activities: Math.floor(
        (Math.random() * 20 + (isWeekend ? 5 : 10)) * scale
      ),
      meetings: Math.floor(
        (Math.random() * 3 + (dayOfWeek === 1 ? 2 : 0)) * scale
      ),
      documents: Math.floor((Math.random() * 5 + 1) * scale),
      codeCommits: Math.floor(
        (Math.random() * 10 + (isWeekend ? 0 : 3)) * scale
      ),
      reviews: Math.floor((Math.random() * 4 + 1) * scale),
    };
    activities.push(activity);
  }

  return activities.reverse();
};

const ActivitySimulator = ({ onActivityGenerated }) => {
  const [activityLevel, setActivityLevel] = useState([50]);

  const simulateActivity = () => {
    const generatedActivity = generateActivityData(activityLevel[0]);
    console.log("Generated activity:", generatedActivity);
    onActivityGenerated?.(generatedActivity);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Activity Simulator
      </h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-foreground">Activity Level</Label>
          <Slider
            value={activityLevel}
            onValueChange={setActivityLevel}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            Level: {activityLevel[0]}%
          </div>
        </div>
        <Button
          onClick={simulateActivity}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Generate Activity
        </Button>
      </div>
    </Card>
  );
};

export default ActivitySimulator;
