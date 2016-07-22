import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
    selector: 'app-dashboard',
    providers: [DashboardService],
    directives: [MenuComponent],
    templateUrl: './dashboard.component.html',
    styles: [require('./dashboard.component.scss').toString()]
})
export class DashboardComponent {  
  private componentName:string = 'DashboardComponent';
  private panels:any = [];
  private error:boolean = false;

  constructor(_service:DashboardService) {

    _service.getData().subscribe(
      data => { this.panels = data; },
      err => { this.error = true }
    );
  }
}