import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private readonly donationsUri = 'donations/';

  constructor(private _httpService: HttpService) { }

  public getDonations(): Observable<object> {
    return this._httpService._apiGet(this.donationsUri);
  }
}
