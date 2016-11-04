import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Application } from './common/application';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';

require('css/manifest.js');

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  precompile: [LoginComponent, HomeComponent, DashboardComponent, OpportunitiesComponent],
  templateUrl: './app.component.html',
  styles: [require('./app.component.scss').toString()]
})
export class AppComponent {
  constructor(_application:Application) {}
}