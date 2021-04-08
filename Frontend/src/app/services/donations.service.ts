import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {UserModel} from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private readonly donationsUri = 'donations/';

  constructor(private _httpService: HttpService) { }

  public getDonations(): Observable<object> {
    return this._httpService._apiGet(this.donationsUri);
  }

  public postDonation(donation: object): Observable<any> {
    console.log(donation);
    return this._httpService._apiPost(this.donationsUri, donation).subscribe();
  }
}
