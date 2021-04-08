import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {InitDataModel} from '../models/InitDataModel';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private readonly donationsUri = 'donations/';
  private readonly donationsInitDataUri = 'donations/init-data/';
  private _initData: InitDataModel;

  constructor(private _httpService: HttpService) { }

  public getDonations(): Observable<object> {
    return this._httpService._apiGet(this.donationsUri);
  }

  public getInitData(userId: number): Observable<any> {
    return this._httpService._apiGet(this.donationsInitDataUri + userId + '/');
  }

  public postDonation(donation: object): Subscription {
    return this._httpService._apiPost(this.donationsUri, donation).subscribe();
  }

  get initData(): InitDataModel {
    return this._initData;
  }
}
