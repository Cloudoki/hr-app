import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login() {
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    this.isLoggedIn = true;
    this.router.navigate(['']);
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}