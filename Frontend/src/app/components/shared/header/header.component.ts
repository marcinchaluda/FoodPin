import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbar: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbar.isOpen$;
  }

  public toggleMenu() {
    this._navbar.toggleNavbar();
  }
}
