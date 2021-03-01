import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {AuthorizationService} from "../services/authorization.service";
import {NavbarService} from "../shared/navbar/navbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanLoad {

  constructor(
    private _authService: AuthorizationService,
    private _navbarService: NavbarService,
    private _router: Router,
    ) {}

  canLoad(route: Route): boolean {
    if (this._authService.loggedUser$.value) {
      this._navbarService.hideNavbar();
      return true;
    }
    this._navbarService.hideNavbar();
    this._router.navigate(['login']);
    return false;
  }
}
