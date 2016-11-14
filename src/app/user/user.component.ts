import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MenuComponent } from '../menu/menu.component';
import { User } from './user';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  providers: [UserService],
  directives: [MenuComponent],
  templateUrl: './user.component.html',
  styles: [require('./user.component.scss').toString()]
})
export class UserComponent {  
  private componentName:string = 'UserComponent';
  private user:any;
  private error:boolean = false;
  private insert:boolean = false;
  private order:string = 'desc';
  private model:User;

  constructor(_service:UserService) {
    
    _service.getData().subscribe(
      data => { this.user = data; },
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
    this.newUser();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}