import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app-home',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: './home.component.html',
    styles: [require('./home.component.scss').toString()]
})
export class HomeComponent {  
  private componentName:string = 'HomeComponent';
  private logo:string = require('images/logo.png');
  private logoApp:string = require('images/logoapp.png');
  private cover:string = require('images/bg01.jpg');
  private montage:string = require('images/montage.png');

  constructor() {
  }
}