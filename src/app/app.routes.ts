import { provideRouter, RouterConfig } from '@angular/router';
import { LoginRoutes, AUTH_PROVIDERS } from './auth/login/login.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { UsersRoutes } from './users/users.routes';

export const routes: RouterConfig = [
  ...DashboardRoutes,
  ...LoginRoutes,
  ...UsersRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];