import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {AuthorizationService} from '../../services/authorization.service';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  @Input()
  donation: object;
  trashIcon = faTrashAlt;
  loggedUserId: string = this._localStorageService.getItem('userId');
  loggedUser$: BehaviorSubject<string>;

  constructor(
    private _localStorageService: LocalStorageService,
    private _authService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.loggedUser$ = this._authService.loggedUser$;
  }

  deleteDonation(): void {
    console.log('Delete donation to be implemented!');
  }
}
