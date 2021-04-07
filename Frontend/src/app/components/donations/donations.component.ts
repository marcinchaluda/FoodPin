import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';
import {DonationsService} from '../../services/donations.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;
  donations$: Observable<object>;

  constructor(
    private _navbarService: NavbarService,
    private _donationsService: DonationsService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    this.donations$ = this._donationsService.getDonations();
  }

}
