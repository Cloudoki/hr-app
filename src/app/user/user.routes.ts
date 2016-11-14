import { AuthGuard }  from '../auth/auth.guard';
import { RouterConfig }  from '@angular/router';
import { UserComponent } from './user.component';

export const UserRoutes: RouterConfig = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];
