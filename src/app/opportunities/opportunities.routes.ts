import { AuthGuard }  from '../auth/auth.guard';
import { RouterConfig }  from '@angular/router';
import { OpportunitiesComponent } from './opportunities.component';
import { OpportunityDetailComponent } from './opportunity-detail.component';

export const OpportunitiesRoutes: RouterConfig = [
  { path: 'opportunities', component: OpportunitiesComponent, canActivate: [AuthGuard] },
  { path: 'opportunities/:id', component: OpportunityDetailComponent, canActivate: [AuthGuard] }
];
