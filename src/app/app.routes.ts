import { provideRouter, RouterConfig } from '@angular/router';
import { LoginRoutes, AUTH_PROVIDERS } from './auth/login/login.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { OpportunitiesRoutes } from './opportunities/opportunities.routes';
import { UsersRoutes } from './users/users.routes';
import { HomeComponent } from './home/home.component';

export const routes: RouterConfig = [
	{ path: '', redirectTo: '/home', terminal: true },
	{ path: 'home', component: HomeComponent },
  ...DashboardRoutes,
  ...OpportunitiesRoutes,
  ...LoginRoutes,
  ...UsersRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];