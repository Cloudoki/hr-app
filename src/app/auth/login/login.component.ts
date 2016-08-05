import {APP_DATA} from '../../common/config';
import { Component }   from '@angular/core';
import { AuthService } from '../auth.service';
import { Application } from '../../common/application';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
  templateUrl: './login.component.html',
  styles: [require('./login.component.scss').toString()]
})
export class LoginComponent {
  private message: string;
  private loginUrl: SafeResourceUrl;

  constructor(private authService: AuthService, private _application:Application, private sanitizer: DomSanitizationService) {
    this.hasToken();
  }

  setloginwindow()
  {
    this.loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(APP_DATA.authurl + "login?response_type=token&state=xyz&client_id=" + APP_DATA.appid + "&redirect_uri=" + this.origin() + "/auth.html");
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
          
      this.setloginwindow();
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

  private origin() {
    return (window.location.origin) ? window.location.origin : window.location.protocol + "//" + window.location.hostname;
  }
}
