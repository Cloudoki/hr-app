import { AuthGuard }     		from '../auth/auth.guard';
import { Observable } 			from 'rxjs/Observable';
import { RouterConfig }         from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

export const DashboardRoutes: RouterConfig = [
	{ path: '', redirectTo: '/dashboard', terminal: true },
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		resolve: () => {
	    	return Observable.of(true).delay(10000).do(val => this.isLoggedIn = true);
	    }
	}
];
