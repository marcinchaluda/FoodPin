import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../navbar/navbar.service';

@Component({
  selector: 'app-donate-food-modal',
  templateUrl: './donate-food-modal.component.html',
  styleUrls: ['./donate-food-modal.component.scss']
})
export class DonateFoodModalComponent implements OnInit {

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
  }

  public homePageRedirect(): void {
    this._navbarService.redirectToHomePage();
  }
}
