import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {faEnvelope, faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons"
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"
import {NavbarService} from "../../services/navbar.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
    private _navbar: NavbarService,
    private _toastr: ToastrService,
    ) { }

  public ngOnInit(): void {
    this.isOpen$ = this._navbar.isOpen$;
    this.loggedUser$ = this._authService.loggedUser$;
  }

  public toggleMenu() {
    this._navbar.toggleNavbar();
  }

  public logoutUser(): void {
    if (!this._authService.getRefreshToken() !== null) {
      this._authService.logout$().subscribe(
        _ => {
          this._toastr.success("Successfully logged out");
        },
      );
    }
  }
}
