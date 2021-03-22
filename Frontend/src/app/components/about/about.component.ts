import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
  }

}
