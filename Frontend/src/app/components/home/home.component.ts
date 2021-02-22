import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {faUserCircle, faEnvelope} from "@fortawesome/free-solid-svg-icons"
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"

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


  constructor(
    private _authService: AuthorizationService,
    private _router: Router,
    private _toastr: ToastrService,
    ) { }

  public ngOnInit(): void {
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
