import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {DonationsService} from '../services/donations.service';
import {LocalStorageService} from '../services/local-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitDataResolver implements Resolve<any> {
  constructor(
    private _donationService: DonationsService,
    private _localStorageService: LocalStorageService,
  ) {
  }

  resolve(): Observable<any>  {
    return this._donationService.getInitData(Number(this._localStorageService.getItem('userId')));
  }
}
