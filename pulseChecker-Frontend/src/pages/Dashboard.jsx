import React from "react";
import { useAuth } from "../contexts/hooks";
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome, {user?.name || "User"}!
          </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard cards or widgets can be added here */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-indigo-900">
                  Quick Stats
                </h2>
                <p className="mt-2 text-indigo-700">Your dashboard overview</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900">
                  Recent Activity
                </h2>
                <p className="mt-2 text-green-700">Your recent actions</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-900">
                  Notifications
                </h2>
                <p className="mt-2 text-purple-700">Latest updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
