import { Component, OnInit } from '@angular/core';
import {faEnvelope, faInfoCircle, faSignal, faUserCircle, faUserCog} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {AuthorizationService} from "../../../services/authorization.service";

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
  isOpen$ = true;
  loggedUser: string;

  constructor(private _authService: AuthorizationService) { }

  ngOnInit(): void {
    this.loggedUser = this._authService.loggedUser;
  }
}
