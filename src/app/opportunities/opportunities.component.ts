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

		console.log(OpportunityDummy);

		let text = "some random value ..";
		_.each(this.model, ((index, key)=> {
			console.log(key);

			// title
			// description
			// requirements
			// skills
			// nice_to_have
			// perks
			// location
			// status
			// created_by

			switch (key) {
				case 'description':
					text = 'We are currently looking for a Front-end Developer to join our young and creative team in sunny Lisbon. You will work on Start-up projects with modern front-end frameworks and latest browser technologies but also on awesome web application with rich UIs for banking & luxury companies, most of them based in western and central Europe. We offer a creative and diverse environment with a focus on learning and development of new skills among our team members. We have flexible working hours and a gross salary between € 20.000 – 35.000 per year depending on your experience.';
					break;
			}

			this.model[key] = (key == 'created_by' || key == 'status') ? 1 : text;
		}));

		console.log(this.model);
	}

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }
}