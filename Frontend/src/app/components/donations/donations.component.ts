import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
  }

}
