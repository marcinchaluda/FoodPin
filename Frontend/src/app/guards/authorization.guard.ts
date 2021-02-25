import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {AuthorizationService} from "../services/authorization.service";
import {NavbarService} from "../services/navbar.service";

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
      this._navbarService.toggleNavbar();
      return true;
    }
    this._navbarService.toggleNavbar();
    this._router.navigate(['login']).then(console.log);
    return false;
  }
}
