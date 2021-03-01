import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../navbar/navbar.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
  }

  public showMenu() {
    this._navbarService.showNavbar();
  }

  public homePageRedirect(): void {
    this._navbarService.redirectToHomePage();
  }
}
