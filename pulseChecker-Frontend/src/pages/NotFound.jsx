import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
