// main entry point
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Add these symbols to override the `LocationStrategy`
import { disableDeprecatedForms, provideForms } from '@angular/forms';
//import { BaseService } from './base.service';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/auth/auth.service';
import { Application } from './app/common/application';
import { HttpClient } from './app/common/http.client';

if (process.env.ENV) console.log('environment:', process.env.ENV);

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  //BaseService,
  Application,
  HttpClient,
  AuthService,
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  { provide: LocationStrategy, useClass: HashLocationStrategy }
])
.catch(err => console.error(err));