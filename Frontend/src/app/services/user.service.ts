import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpService} from './http.service';
import {UserModel} from '../models/UserModel';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly registrationUri = 'sessions/registration/';
  private readonly usersUri = 'users/';
  private _userDetails: UserModel;

  constructor(private _httpService: HttpService) { }

  public registerUser$(userData): Observable<any> {
    return this._httpService._apiPost(this.registrationUri, userData);
  }

  public getUser(userId: number): Subscription {
    return this._httpService._apiGet(this.usersUri + userId + '/')
      .pipe(
        map(data => this._userDetails = new UserModel(data))
      ).subscribe();
  }

  get userDetails(): UserModel {
    return this._userDetails;
  }
}
