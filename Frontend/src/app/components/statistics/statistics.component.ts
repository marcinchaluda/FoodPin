import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
  }

}
