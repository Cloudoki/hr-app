import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '../common/http.client';
import { Application } from '../common/application';
import { Opportunity } from './opportunity';

@Injectable()

export class OpportunitiesService { 

    private result: Object;
    private error: Object;
    private endpoint:string = 'opportunities';

    constructor(
      private httpClient: HttpClient,
      private _application:Application
    ) {}

    getData() {
      return this.httpClient.get(this._application.api + this.endpoint)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getDataById(id:string) {
      return this.httpClient.get(this._application.api + this.endpoint + '/' + id)
        .map(this.extractData)
        .catch(this.handleError);
    }

    addData(data:Opportunity) {
      return this.httpClient.post(this._application.api + this.endpoint, data)
        .map(this.extractData)
        .catch(this.handleError);
    }

    deleteData(id:string) {
      console.log(this._application.api + this.endpoint + '/' + id);
      return this.httpClient.delete(this._application.api + this.endpoint + '/' + id)
        .map(this.extractData)
        .catch(this.handleError);
    }

    updateData(id:string, data:Object) {
      return this.httpClient.patch(this._application.api + this.endpoint + '/' + id, data)
        .map(this.extractData)
        .catch(this.handleError);
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