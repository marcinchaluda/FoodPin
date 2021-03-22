import {Component, OnInit} from '@angular/core';
import {faEnvelope, faInfoCircle, faSignal, faTimes, faUserCircle, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {AuthorizationService} from '../../services/authorization.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NavbarService} from './navbar.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userIcon = faUserCircle;
  accountIcon = faUserCog;
  statsIcon = faSignal;
  infoIcon = faInfoCircle;
  facebookIcon = faFacebookF;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  emailIcon = faEnvelope;
  closeIcon = faTimes;
  loggedUser$: BehaviorSubject<string>;
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _authService: AuthorizationService,
    private _toastr: ToastrService,
    private _navbarService: NavbarService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    this.loggedUser$ = this._authService.loggedUser$;
  }

  public logoutUser(): void {
    if (this._authService.getRefreshToken() !== null) {
      this._authService.logout$().subscribe(
        _ => {
          this._toastr.success('Successfully logged out');
          this.homePageRedirect();
        },
      );
    }
  }

  public hideMenu(): void {
    this._navbarService.hideNavbar();
  }

  public redirectToAccount(): void {
    this.hideMenu();
    this._router.navigate(['account']);
  }

  public redirectToAbout(): void {
    this.hideMenu();
    this._router.navigate(['about']);
  }

  public homePageRedirect(): void {
    this.hideMenu();
    this._navbarService.redirectToHomePage();
  }
}
