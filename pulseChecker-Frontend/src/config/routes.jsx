import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import TeamList from "../pages/TeamList";
import TeamDashboard from "../pages/TeamDashboard";
import TeamSetup from "../pages/TeamSetup";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <TeamList />,
      },
      {
        path: "/team-setup",
        element: <TeamSetup />,
      },
      {
        path: "/team/:teamId",
        element: <TeamDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Fallback to home page
  },
]);
