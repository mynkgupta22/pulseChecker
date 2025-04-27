import React from "react";
import SampleBarChart from "../components/charts/SampleBarChart";

const ChartsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Charts Demo</h1>
      <div className="grid grid-cols-1 gap-6">
        <SampleBarChart />
      </div>
    </div>
  );
};

export default ChartsPage;
