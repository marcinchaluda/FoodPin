import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {faEnvelope, faUserCircle} from "@fortawesome/free-solid-svg-icons"
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"
import {NavbarService} from "../../services/navbar.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userIcon = faUserCircle;
  facebookIcon = faFacebookF;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  emailIcon = faEnvelope;
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _authService: AuthorizationService,
    private _navbar: NavbarService,
    ) { }

  public ngOnInit(): void {
    this.isOpen$ = this._navbar.isOpen$;
  }

  public toggleMenu() {
    this._navbar.toggleNavbar();
  }
}
