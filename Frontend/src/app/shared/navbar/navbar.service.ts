import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class NavbarService {
  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router) {}

  public showNavbar(): void {
    this.isOpen$.next(true);
  }

  public hideNavbar(): void {
    this.isOpen$.next(false);
  }

  public redirectToHomePage() {
    this.hideNavbar();
    this._router.navigate(["home"]);
  }
}
