import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
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
    return this._httpService._apiGet(this.usersUri + userId);
    // return {
    //   username: "test",
    //   firstname: "jan",
    //   lastname: "jan",
    //   email: "test@test.pl",
    //   password: "",
    //   phone: "777777777",
    //   address: {
    //     street: "first",
    //     localnumber: "4",
    //     postalcode: "33333",
    //     city: "Kraków",
    //     country: "Polska",
    //   },
    // }
  }
}
