import { Component } from '@angular/core';
import { Router }  from '@angular/router';
import { Application } from '../common/application';
import { OpportunitiesService } from './opportunities.service';
import { MenuComponent } from '../menu/menu.component';
import { Opportunity } from './opportunity';
import * as _ from 'lodash';

@Component({
  selector: 'app-opportunities',
  providers: [OpportunitiesService],
  directives: [MenuComponent],
  templateUrl: './opportunities.component.html',
  styles: [require('./opportunities.component.scss').toString()]
})
export class OpportunitiesComponent {  
  private componentName:string = 'OpportunitiesComponent';
  private opportunities:any = [];
  private error:boolean = false;
  private insert:boolean = false;
  private order:string = 'desc';
  private model:Opportunity;
  private profile:number;

  constructor(private router: Router, _service:OpportunitiesService, _application:Application) {
    
    _service.getData().subscribe(
      data => { this.opportunities = data; },
      err => { this.error = true }
    );

    this.profile = _application.userProfile;
    this.newOpportunity();
  }

  newOpportunity() {
    this.model = new Opportunity();
  }

  add() {
    this.insert = !this.insert;
  }

  delete(obj:any) {
    console.log(obj);
  }

  onSubmit() {
    this.add();
    this.opportunities.push(this.model);
    this.newOpportunity();
    this.sort();
    console.log(this.opportunities);
  }

  sort() {
    this.opportunities = _.orderBy(this.opportunities, 'id', this.order);
  }

  gotoDetail(data:any) {
    this.router.navigate(['/opportunities', data.id]);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}