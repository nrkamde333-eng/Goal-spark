import { createRouter, createRoute } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { Route as rootRoute } from "./routes/__root";
import LandingPage from "./routes/index";
import { AuthPage } from "./routes/auth";
import { AppLayout } from "./routes/app";
import { Dashboard } from "./routes/app.index";
import { Planner } from "./routes/app.planner";
import { CalendarPage } from "./routes/app.calendar";
import { TasksPage } from "./routes/app.tasks";
import HabitsPage from "./routes/app.habits";
import AnalyticsPage from "./routes/app.analytics";
import { SettingsPage } from "./routes/app.settings";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppLayout,
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: Dashboard,
});

const appPlannerRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/planner",
  component: Planner,
});

const appCalendarRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/calendar",
  component: CalendarPage,
});

const appTasksRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/tasks",
  component: TasksPage,
});

const appHabitsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/habits",
  component: HabitsPage,
});

const appAnalyticsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/analytics",
  component: AnalyticsPage,
});

const appSettingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  appRoute.addChildren([
    appIndexRoute,
    appPlannerRoute,
    appCalendarRoute,
    appTasksRoute,
    appHabitsRoute,
    appAnalyticsRoute,
    appSettingsRoute,
  ]),
]);

export const queryClient = new QueryClient();

export function getRouter() {
  return createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
