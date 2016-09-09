import { Component, OnInit, OnDestroy } from '@angular/core';
import { Application } from '../common/application';
import { Router, ActivatedRoute } from '@angular/router';
import { OpportunitiesService } from './opportunities.service';
import { HttpClient } from '../common/http.client';
import { MenuComponent } from '../menu/menu.component';
import { Opportunity } from './opportunity';
import * as _ from 'lodash';

@Component({
  selector: 'app-opportunity-detail',
  providers: [OpportunitiesService, HttpClient],
  directives: [MenuComponent],
  templateUrl: './opportunity-detail.component.html',
  styles: [require('./opportunity-detail.component.scss').toString()]
})
export class OpportunityDetailComponent {  
  private componentName:string = 'OpportunityDetailComponent';
  private opportunity = {};
  private error:boolean = false;
  private sub: any;
  private loaded:boolean = false;
  private profile:number;
  private editField:string = null;
  private updated:Object = {};
  private original:Object = {};

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private _service:OpportunitiesService,
    private _application:Application
  ) {}

  ngOnInit() {
    this.profile = this._application.userProfile;

    this.sub = this.route.params.subscribe(params => {
      let id:any = +params['id'];

      this._service.getDataById(id).subscribe(
        (data:any) => {
          this.opportunity = data;
          this.original = _.clone(data);
          this.loaded = true;
        },
        (err:any) => { this.error = true }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back() {
    history.back();
  }

  reply(obj:any) {
    var a = document.createElement('a');
    a.setAttribute('href', 'mailto:rui@cloudoki.com?Subject=Reply to ' + this.opportunity['title']);
    a.click();
  }

  save() {
    console.log(this.updated);
    this._service.updateData(this.opportunity['id'], this.updated).subscribe(
      (data:any) => {
        console.log('successfully updated opportunity!');
        this.router.navigate(['/opportunities']);
      },
      (err:any) => { this.error = true }
    );
  }

  undo(key:string) {
    //console.log(this.original[key]);
    this.opportunity[key] = this.original[key];
    //delete this.updated[key];
  }

  changed() {
    return _.isEmpty(this.updated);
  }

  edit(name:string) {
    this.editField = (this.editField === name) ? null : name;

    setTimeout(()=>{
      $('#' + name).focus();
    });
  }
}