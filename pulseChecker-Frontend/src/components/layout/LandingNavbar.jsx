import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/hooks";

const LandingNavbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Pulse Checker
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            {user ? (
              <Button onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
