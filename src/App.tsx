import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redirect from "./components/redirect";
import { ThemeProvider } from "./components/theme-provider";
import NotFoundPage from "./routes/404";
import BolusWizardPage from "./routes/bolus-wizard/page";
import CarePortalPage from "./routes/careportal/page";
import Dashboard from "./routes/dashboard/Dashboard";
import FoodPage from "./routes/food/page";
import AuthenticationPage from "./routes/Login";
import ReportsPage from "./routes/reports/page";
import RootRoute from "./routes/RootRoute";
import SettingsAccountPage from "./routes/settings/account/page";
import SettingsAppearancePage from "./routes/settings/appearance/page";
import SettingsDisplayPage from "./routes/settings/display/page";
import SettingsPage from "./routes/settings/layout";
import SettingsNotificationsPage from "./routes/settings/notifications/page";
import SettingsProfilePage from "./routes/settings/profile/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/careportal", element: <CarePortalPage /> },
      { path: "/bolus-wizard", element: <BolusWizardPage /> },
      { path: "/food", element: <FoodPage /> },
      { path: "/reports", element: <ReportsPage /> },
      {
        path: "/settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: (
              <Redirect to="/settings/profile" options={{ replace: true }} />
            ),
          },
          { path: "profile", element: <SettingsProfilePage /> },
          { path: "notifications", element: <SettingsNotificationsPage /> },
          { path: "display", element: <SettingsDisplayPage /> },
          { path: "appearance", element: <SettingsAppearancePage /> },
          { path: "account", element: <SettingsAccountPage /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationPage />,
  },
]);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
