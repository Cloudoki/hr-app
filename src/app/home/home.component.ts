import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Application } from '../common/application';
import * as _ from 'lodash';

@Component({
		selector: 'app-home',
		directives: [ROUTER_DIRECTIVES],
		templateUrl: './home.component.html',
		styles: [require('./home.component.scss').toString()]
})
export class HomeComponent {  
	private componentName:string = 'HomeComponent';
	private logo:string = require('images/logo.png');
	private cover:string = require('images/backg.jpg');

	constructor(private router:Router, private _application:Application) {
		if (_application.isAuthenticated())
			this.router.navigate(['/dashboard']);

		setTimeout(function(){
			let els = $('.anim');

			_.each(els, (el:any, index:any)=>{
				setTimeout(() => {
					$(el).removeClass('start');
				}, index * 500);
			});
		});
	}
}