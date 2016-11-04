import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient } from '../common/http.client';
import { Application } from '../common/application';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private _application:Application
  ) {}

  getUserData() {
    return this.httpClient.get(this._application.api + 'me?display=full')
      .map(this.extractData)
      .catch(this.handleError);
  }

  login() {
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}