import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../navbar/navbar.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-most-waste-products',
  templateUrl: './most-waste-products.component.html',
  styleUrls: ['./most-waste-products.component.scss']
})
export class MostWasteProductsComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
  }
}
