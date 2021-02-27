import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly registrationUri = 'sessions/registration/';

  constructor(private _httpService: HttpService) { }

  registerUser$(userData): Observable<any> {
    return this._httpService._apiPost(this.registrationUri, userData);
  }
}
