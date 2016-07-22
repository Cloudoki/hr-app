import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunitiesService } from './opportunities.service';
import { MenuComponent } from '../menu/menu.component';
import { Opportunity } from './opportunity';
import * as _ from 'lodash';

@Component({
  selector: 'app-opportunity-detail',
  providers: [OpportunitiesService],
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

  constructor(private route: ActivatedRoute, private _service:OpportunitiesService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];

      this._service.getData().subscribe(
        data => {
          this.opportunity = _.find(data, {id:id});
          this.loaded = true;
        },
        err => { this.error = true }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back() {
    history.back();
  }

  reply() {
    console.log('reply here ..');
  }
}