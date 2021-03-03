import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map, mapTo, tap} from "rxjs/operators";
import {Tokens} from "../models/Tokens";
import {User} from "../models/User";
import {HttpService} from "./http.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  private readonly loginUri: string = 'sessions/login/';
  private readonly logoutUri: string = 'sessions/logout/';
  private readonly refreshTokenUri: string = 'sessions/token/refresh/';
  public loggedUser$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
  ) { }

  public login$(user: User): Observable<boolean> {
    return this._httpService._apiPost(this.loginUri, user)
      .pipe(
        map(r => console.log(r)),
        tap(response => this.doLoginUser(user, response)),
        mapTo(true),
      );
  }

  private doLoginUser(user: User, response): void {
    console.log(response);
    // const id = response['user'].id;
    // this._localStorageService.setItem('userId', id);
    this.loggedUser$.next(user.email);
    // this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  public logout$(): Observable<boolean> {
    const refreshToken: object = {
      refresh: this.getRefreshToken()
    };
    if (this.getRefreshToken() === null) {
      return;
    }

    return this._httpService._apiPost(this.logoutUri, refreshToken)
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
      );
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLogoutUser(): void {
    this.loggedUser$.next(null);
    this.removeTokens();
    this._localStorageService.clear();
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: Tokens = this.createRefreshToken();
    return this._httpService._apiPost(this.refreshTokenUri, refreshToken)
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.access_token);
        }),
      );
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  public getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private createRefreshToken(): Tokens {
    const refreshToken: Tokens = ({
      refresh_token: this.getRefreshToken(),
    });
    return refreshToken;
  }
}
