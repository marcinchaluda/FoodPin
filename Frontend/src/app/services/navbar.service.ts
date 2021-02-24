import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router) {}

  public toggleNavbar(): void {
    this.isOpen$.next(!this.isOpen$.value);
  }

  public redirectToHomePage() {
    this.isOpen$.next(!this.isOpen$.value);
    this._router.navigate(["home"]).then(console.log);
  }
}
