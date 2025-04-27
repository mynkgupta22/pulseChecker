import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Settings = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="space-y-8">
              {/* Notification Settings */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("email")}
                      className={`${
                        notifications.email ? "bg-indigo-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          notifications.email
                            ? "translate-x-5"
                            : "translate-x-0"
                        } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive push notifications
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("push")}
                      className={`${
                        notifications.push ? "bg-indigo-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          notifications.push ? "translate-x-5" : "translate-x-0"
                        } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Marketing Emails
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive marketing and promotional emails
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("marketing")}
                      className={`${
                        notifications.marketing
                          ? "bg-indigo-600"
                          : "bg-gray-200"
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          notifications.marketing
                            ? "translate-x-5"
                            : "translate-x-0"
                        } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
