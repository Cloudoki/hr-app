import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { MenuComponent } from '../menu/menu.component';
import { User } from './user';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  providers: [UsersService],
  directives: [MenuComponent],
  templateUrl: './users.component.html',
  styles: [require('./users.component.scss').toString()]
})
export class UsersComponent {  
  private componentName:string = 'UsersComponent';
  private users:any = [];
  private error:boolean = false;
  private insert:boolean = false;
  private order:string = 'desc';
  private model:User;

  constructor(_service:UsersService) {
    
    _service.getData().subscribe(
      data => { this.users = data; },
      err => { this.error = true }
    );

    this.newUser();
  }

  newUser() {
    this.model = new User();
  }

  add() {
    this.insert = !this.insert;
  }

  delete(obj:any) {
    console.log(obj);
  }

  onSubmit() {
    this.add();
    this.users.push(this.model);
    this.newUser();
    this.sort();
    console.log(this.users);
  }

  sort() {
    this.users = _.orderBy(this.users, 'id', this.order);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}