import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-donations-map',
  templateUrl: './donations-map.component.html',
  styleUrls: ['./donations-map.component.scss']
})
export class DonationsMapComponent implements OnInit {
  donations: Array<object>;
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _actRoute: ActivatedRoute,
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    this._actRoute.data.subscribe(data => {
      this.donations = data.donations$;
    });
  }

}
