import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'userProfile'})
export class UserProfilePipe implements PipeTransform {
  transform(menus: Object[], profile:number): any {
  	return menus.filter(menu => menu['profile'] == 0 || menu['profile'] == profile);
  }
}