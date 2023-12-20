import { Redirect } from "./components/Redirect";
import { NotFoundPage } from "./routes/404";
import { AppLayout } from "./routes/AppLayout";
import { Login } from "./routes/login/Login";

export const routes = [
  {
    path: import.meta.env.BASE_URL,
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Dashboard } = await import("./routes/dashboard/Dashboard");
          return { Component: Dashboard };
        },
      },
      {
        path: `${import.meta.env.BASE_URL}/careportal`,
        lazy: async () => {
          const { CarePortalPage } = await import("./routes/careportal/page");
          return { Component: CarePortalPage };
        },
      },
      {
        path: `${import.meta.env.BASE_URL}/bolus-wizard`,
        lazy: async () => {
          const { BolusWizardPage } = await import(
            "./routes/bolus-wizard/BolusWizardPage"
          );
          return { Component: BolusWizardPage };
        },
      },
      {
        path: `${import.meta.env.BASE_URL}/food`,
        lazy: async () => {
          const { FoodPage } = await import("./routes/food/page");
          return { Component: FoodPage };
        },
      },
      {
        path: `${import.meta.env.BASE_URL}/reports`,
        lazy: async () => {
          const { ReportsPage } = await import("./routes/reports/page");
          return { Component: ReportsPage };
        },
      },
      {
        path: `${import.meta.env.BASE_URL}/settings`,
        lazy: async () => {
          const { SettingsLayout } = await import(
            "./routes/settings/SettingsLayout"
          );
          return { Component: SettingsLayout };
        },
        children: [
          {
            index: true,
            element: (
              <Redirect
                to={`${import.meta.env.BASE_URL}/settings/general`}
                options={{ replace: true }}
              />
            ),
          },
          {
            path: `${import.meta.env.BASE_URL}/settings/general`,
            lazy: async () => {
              const { GeneralSettings } = await import(
                "./routes/settings/general-settings/GeneralSettings"
              );
              return { Component: GeneralSettings };
            },
          },
          {
            path: `${import.meta.env.BASE_URL}/settings/profile`,
            lazy: async () => {
              const { ProfileSettings } = await import(
                "./routes/settings/profile/ProfileSettings"
              );
              return { Component: ProfileSettings };
            },
          },
          {
            path: `${import.meta.env.BASE_URL}/settings/notifications`,

            lazy: async () => {
              const { NotificationsSettings } = await import(
                "./routes/settings/notifications/NotificationSettings"
              );
              return { Component: NotificationsSettings };
            },
          },
          {
            path: `${import.meta.env.BASE_URL}/settings/display`,
            lazy: async () => {
              const { DisplaySettings } = await import(
                "./routes/settings/display/DisplaySettings"
              );
              return { Component: DisplaySettings };
            },
          },
          {
            path: `${import.meta.env.BASE_URL}/settings/appearance`,
            lazy: async () => {
              const { AppearanceSettings } = await import(
                "./routes/settings/appearance/AppearanceSettings"
              );
              return { Component: AppearanceSettings };
            },
          },
        ],
      },
    ],
  },
  {
    path: `${import.meta.env.BASE_URL}/auth`,
    element: <Login />,
  },
];
