import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {DonationsService} from '../services/donations.service';

@Injectable({
  providedIn: 'root'
})
export class DonationsResolver implements Resolve<any> {

  constructor(
    private _donationService: DonationsService,
  ) {}

  resolve(): Observable<any> {
    return this._donationService.getDonations();
  }
}
