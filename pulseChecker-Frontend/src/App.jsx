import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./contexts/hooks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import TeamsDashboard from "./pages/TeamsDashboard";
import TeamPage from "./pages/TeamPage";
import TeamSetup from "./components/teams/TeamSetup";
import MyTeams from "./components/teams/MyTeams";
import PanelLayout from "./components/layout/PanelLayout";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider } from "./contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/onboarding"
            element={
              <PrivateRoute>
                <Onboarding />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PanelLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teams" element={<TeamsDashboard />} />
            <Route path="team/:teamId" element={<TeamPage />} />
            <Route path="team-setup" element={<TeamSetup />} />
            <Route path="my-teams" element={<MyTeams />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
