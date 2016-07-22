import { AuthGuard }  from '../auth/auth.guard';
import { RouterConfig, }  from '@angular/router';
import { UsersComponent } from './users.component';

export const UsersRoutes: RouterConfig = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }
];
