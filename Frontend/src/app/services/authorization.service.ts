import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, mapTo, tap} from "rxjs/operators";
import {Tokens} from "../models/Tokens";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  readonly apiUrl: string = environment.apiUrl;
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  public login$(user: User): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}sessions/login/`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
      );
  }

  public logout(): Observable<boolean> {
    const refreshToken: Tokens = ({
      refresh: this.getRefreshToken(),
    });
    return this.http.post<any>(`${this.apiUrl}sessions/logout/`, refreshToken)
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
      );
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLoginUser(userName: string, tokens: Tokens): void {
    this.loggedUser = userName;
    this.storeTokens(tokens);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
