import {Injectable} from '@angular/core';
import {CanLoad, Route} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanLoad {
  canLoad(route: Route): boolean {
    return undefined;
  }

}
