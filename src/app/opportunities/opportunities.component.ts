import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }  from '@angular/router';
import { Application } from '../common/application';
import { OpportunitiesService } from './opportunities.service';
import { MenuComponent } from '../menu/menu.component';
import { Opportunity } from './opportunity';
import { OpportunityDummy } from './opportunity-dummy';
import { HttpClient } from '../common/http.client';
import * as _ from 'lodash';
declare  var $:any;

@Component({
	selector: 'app-opportunities',
	providers: [OpportunitiesService, HttpClient],
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
	private selected:any= {};


	constructor(private router:Router, private _service:OpportunitiesService, private _application:Application) {}

	ngOnInit() {
		this.profile = this._application.userProfile;
		this.newOpportunity();

		this.getOpportunitites();
	}

	ngOnDestroy() {}

	newOpportunity() {
		this.model = new Opportunity();
	}

	add() {
		this.insert = !this.insert;
	}

	getOpportunitites() {
		this.opportunities = [];

		this._service.getData().subscribe(
			(data:any) => { this.opportunities = data; this.sort(); },
			(err:any) => { this.error = true }
		);
	}

	delete(e:Event, obj:Opportunity) {
		e.stopPropagation();

		this.selected = obj;
		console.log(this.selected);

		$('#confirmModal').modal('show');

		// this._service.deleteData(obj['id']).subscribe(
		//   (data:any) => {
		//     console.log('successfully delete opportunity!');
		//     _.remove(this.opportunities, function(n) {
		//       return n == obj;
		//     });
		//   },
		//   (err:any) => { this.error = true }
		// );
	}

	deleteConfirm() {

		$('#confirmModal').modal('hide');

		this._service.deleteData(this.selected['id']).subscribe(
			(data:any) => {
				console.log('successfully delete opportunity!');
				_.remove(this.opportunities, ((n)=> {
					return n == this.selected;
				}));
			},
			(err:any) => { this.error = true }
		);
	}

	onSubmit() {

		this._service.addData(this.model).subscribe(
			(data:any) => {
				console.log('successfully added new opportunity!');
				this.add();
				this.getOpportunitites();
			},
			(err:any) => { this.error = true }
		);

		/*this.add();
		this.opportunities.push(this.model);
		this.newOpportunity();
		this.sort();*/
	}

	sort() {
		this.opportunities = _.orderBy(this.opportunities, 'id', this.order);
	}

	gotoDetail(data:any) {
		this.router.navigate(['/opportunities', data.id]);
	}

	dummyData() {

		_.each(this.model, ((index, key)=> {

			this.model[key] = (key == 'created_by' || key == 'status') ? 1 : OpportunityDummy[key];
		}));

		console.log(this.model);
	}

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }
}