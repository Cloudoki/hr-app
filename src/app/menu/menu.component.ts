import { Application } from '../common/application';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { UserProfilePipe } from './user-profile.pipe';

@Component({
  selector: 'app-menu',
  directives: [ROUTER_DIRECTIVES],
  pipes: [UserProfilePipe],
  templateUrl: './menu.component.html',
  styles: [require('./menu.component.scss').toString()]
})
export class MenuComponent {
  private logo:string = require('images/logo.png');
  
  componentName = 'MenuComponent';
  menus: Array<any>;
  active:string = '';
  profile:number;

  constructor(private router:Router, private _application:Application) {
    
    this.profile = _application.userProfile;
    
    this.menus = [
      { name: 'opportunities', target: 'opportunities', profile:0 },
      { name: 'contacts', target: 'contacts', profile:0 },
      { name: 'faq', target: 'faq', profile:0 }
    ];
  }

  ngOnInit() {
    // remove hash from router name
    this.active = this.router.url.replace(/[^A-Z]+/ig, "");
  }

  ngOnDestroy() {}

  menuSelect(name:string) {}

  logout() {
    this._application.session.logout();
  }
}