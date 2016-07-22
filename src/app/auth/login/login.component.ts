import {APP_DATA} from '../../common/config';
import { Component }   from '@angular/core';
import { AuthService } from '../auth.service';
import { Application } from '../../common/application';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
  templateUrl: './login.component.html',
  /*template: `
    <div class="login"><div class="app-card p-30">
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <p>
      <button class="btn btn-primary" (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button class="btn btn-primary" (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </p></div></div>`,*/
    styles: [require('./login.component.scss').toString()]
})
export class LoginComponent {
  private message: string;
  private loginUrl: SafeResourceUrl;

  constructor(private authService: AuthService, private _application:Application, private sanitizer: DomSanitizationService) {
    this.setMessage();
    this.hasToken();
  }

  setloginwindow()
  {
    this.loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(APP_DATA.authurl + "login?response_type=token&client_id=" + APP_DATA.appid + "&redirect_uri=" + this.origin() + "/auth.html");
  }

  hello()
  {
    this.authService.login();
    // init global application
    this._application.init(this.authService);
  }
  
  hasToken()
  {
    // Authentication
    var token = window.localStorage.getItem('token');
    
    if(token && token.length > 9) this.hello();
    else  
    {
      if(token) window.localStorage.removeItem('token');
          
      this.setloginwindow ();
      window.addEventListener("message", this.receiveToken.bind(this), false);  
    }
  }
  
  receiveToken(event:any)
  {
    if (event.origin !== this.origin())
    return;
    
    if (event.data && event.data.length > 9)
    {
      window.localStorage.setItem('token', event.data);
      this.hello();
    }
    else this.setloginwindow();
  }

  // ----------

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  /*login() {
    this.message = 'Trying to log in ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Todo: capture where the user was going and nav there.
        // Meanwhile redirect the user to main area
        this.router.navigate(['']);
      }
    });
  }*/
  
  /*logout() {
    this.authService.logout();
    this.setMessage();
  }*/

  private origin() {
    return (window.location.origin) ? window.location.origin : window.location.protocol + "//" + window.location.hostname;
  }
}
