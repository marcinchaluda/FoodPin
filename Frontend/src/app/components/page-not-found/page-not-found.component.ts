import {Component} from '@angular/core';
import {NavbarService} from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(
    private _navbarService: NavbarService,
  ) {
  }

  public homePageRedirect(): void {
    this._navbarService.redirectToHomePage();
  }
}
