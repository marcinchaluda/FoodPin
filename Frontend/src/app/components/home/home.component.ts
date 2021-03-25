import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {faEnvelope, faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {NavbarService} from '../../shared/navbar/navbar.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userIcon = faUserCircle;
  facebookIcon = faFacebookF;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  emailIcon = faEnvelope;
  logoutIcon = faSignOutAlt;
  isOpen$: BehaviorSubject<boolean>;
  loggedUser$: BehaviorSubject<string>;

  constructor(
    private _authService: AuthorizationService,
    private _navbarService: NavbarService,
    private _toastr: ToastrService,
    private _router: Router,
    ) { }

  public ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    this.loggedUser$ = this._authService.loggedUser$;
    console.log(this.loggedUser$);
  }

  public showMenu(): void {
    this._navbarService.showNavbar();
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

  public donate(): void {
    this._router.navigate(['donate-food']);
  }

  public search(): void {
    this._navbarService.hideNavbar();
    this._router.navigate(['donations']);
  }

  public displayMap(): void {
    console.log('map');
  }
}
