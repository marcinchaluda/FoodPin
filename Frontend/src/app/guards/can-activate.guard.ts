import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';
import {NavbarService} from '../shared/navbar/navbar.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(
    private _authService: AuthorizationService,
    private _navbarService: NavbarService,
    private _router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this._authService.loggedUser$.value) {
      return true;
    }
    this._navbarService.hideNavbar();
    this._router.navigate(['login']);
    return false;
  }

}
