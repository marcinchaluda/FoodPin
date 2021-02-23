import { Component, OnInit } from '@angular/core';
import {faEnvelope, faInfoCircle, faSignal, faUserCircle, faUserCog} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {AuthorizationService} from "../../../services/authorization.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
  loggedUser$: BehaviorSubject<string>;

  constructor(
    private _authService: AuthorizationService,
    private _toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.loggedUser$ = this._authService.loggedUser$;
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
