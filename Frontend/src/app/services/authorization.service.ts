import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {mapTo, tap} from "rxjs/operators";
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

  constructor(private _http: HttpClient) { }

  public login$(user: User): Observable<boolean> {
    return this._http.post<any>(`${this.apiUrl}sessions/login/`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        tap(_ => {console.log(this.refreshToken(), this.getRefreshToken())})
      );
  }

  private doLoginUser(userName: string, tokens: Tokens): void {
    this.loggedUser = userName;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  public logout$(): Observable<boolean> {
    // const refreshToken: Tokens = this.createRefreshToken();
    console.log(this.getRefreshToken());
    const refreshToken: object = {
      refresh: this.getRefreshToken()
    };
    if (this.getRefreshToken() === null) { return; }

    return this._http.post<any>(`${this.apiUrl}sessions/logout/`, refreshToken)
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
      );
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: Tokens = this.createRefreshToken();
    return this._http.post<any>(`${this.apiUrl}sessions/token/refresh/`, refreshToken)
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.access_token);
        }),
      );
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  public getJwtToken():string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private createRefreshToken(): Tokens {
    const refreshToken: Tokens = ({
      refresh_token: this.getRefreshToken(),
    });
    return refreshToken;
  }
}


