import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, mapTo, tap} from "rxjs/operators";
import {Tokens} from "../models/Tokens";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  readonly apiUrl = environment.apiUrl;
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  login(user: {userName: string, password: string}): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.userName, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  private doLoginUser(userName: string, tokens: Tokens) {
    this.loggedUser = userName;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }
}
