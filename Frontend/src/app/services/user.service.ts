import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly registrationUri = 'sessions/registration/';
  private readonly usersUri = 'users/';

  constructor(private _httpService: HttpService) { }

  public registerUser$(userData): Observable<any> {
    return this._httpService._apiPost(this.registrationUri, userData);
  }

  public getUser(userId: number): Observable<any> {
    return this._httpService._apiGet(`this.usersUri${userId}`);
  }
}
