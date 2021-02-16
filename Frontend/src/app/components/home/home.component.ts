import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _authService: AuthorizationService,
    private _router: Router,
    private _toastr: ToastrService,
    ) { }

  public ngOnInit(): void {
  }

  public logoutUser(): void {
    this._authService.logout$().subscribe(
      _ => {
        this._toastr.success("Successfully logged out");
      },
    );
  }

}
