import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../navbar/navbar.service';
import {BehaviorSubject} from 'rxjs';
import {faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {first} from 'rxjs/operators';
import {AuthorizationService} from '../../services/authorization.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;
  loggedUser$: BehaviorSubject<string>;
  logoutIcon = faSignOutAlt;
  userIcon = faUserCircle;

  constructor(
    private _navbarService: NavbarService,
    private _authService: AuthorizationService,
    private _toastr: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    this.loggedUser$ = this._authService.loggedUser$;
  }

  public showMenu(): void {
    this._navbarService.showNavbar();
  }

  public homePageRedirect(): void {
    this._navbarService.redirectToHomePage();
  }

  public logoutUser(): void {
    this._authService.logout$().pipe(
      first(),
    ).subscribe(
      _ => {
        this._toastr.success('Successfully logged out');
        this._navbarService.hideNavbar();
        this._router.navigate(['/home']);
      },
    );
  }
}
