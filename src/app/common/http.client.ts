import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Application } from './application';

@Injectable()
export class HttpClient {
  constructor(private http: Http, private _application:Application) {
    this.http = http;
  }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Bearer ' + this._application.session.authenticationtoken); 
  }

  get(url:any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url:any, data:any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  patch(url:any, data:any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url:any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }
}