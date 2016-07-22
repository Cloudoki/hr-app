import { Application } from '../common/application';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './menu.component.html',
  styles: [require('./menu.component.scss').toString()]
})
export class MenuComponent {
  componentName = 'MenuComponent';
  menus: Array<any>;
  active:string = '';

  constructor(private router:Router, private _application:Application) {
    
    this.menus = [
      { name: 'users', target: 'users' }
    ];
  }

  ngOnInit() {
    // remove hash from router name
    this.active = this.router.url.replace(/[^A-Z0-9]+/ig, "");
  }

  ngOnDestroy() {}

  menuSelect(name:string) {}

  logout() {
    this._application.session.logout();
  }
}