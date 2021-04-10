import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DonateFoodModalService} from './donate-food-modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donate-food-modal',
  templateUrl: './donate-food-modal.component.html',
  styleUrls: ['./donate-food-modal.component.scss']
})
export class DonateFoodModalComponent implements OnInit {

  constructor(
    private _router: Router,
    private _modalService: DonateFoodModalService,
  ) { }

  ngOnInit(): void {
  }

  addDonation(): void {
    this._modalService.hideModal();
    this._router.navigate(['donate-food']);
  }

  redirectToDonations(): void {
    this._modalService.hideModal();
    this._router.navigate(['donations']);
  }
}
