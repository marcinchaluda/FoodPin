import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, retry, switchMap, take} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {AuthorizationService} from "../services/authorization.service";
import {TokenInterceptor} from "./token.interceptor";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private REPEAT_TIMES = 1;
  private ERR_MESSAGE = 0;

  constructor(
    private _tokenInterceptor: TokenInterceptor,
    private _authService: AuthorizationService,
    private _toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(this.REPEAT_TIMES),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string = '';

        if (error.error instanceof HttpErrorResponse && error.error.status === 401) {
          // attempt to refresh the token
          return this.handleUnauthorizedUser(request, next);
        }

        if (error.error instanceof ErrorEvent) {
          errorMessage = `${error.error.message} `;
        } else {
          errorMessage = `${error.status}; `;
          Object.values(error.error).forEach(err => {
            errorMessage += err[this.ERR_MESSAGE] + " ";
          });
        }
        this._toastr.error(errorMessage);
        return throwError(errorMessage);
      }),
    );
  }

  private handleUnauthorizedUser(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // executing token refresh
    if(this.isRefreshing) {
      return this.refreshTokenSubject
        .pipe(
          filter(token => token !== null),
          // transform refresh token into observable which emits only first emitted value
          take(this.REPEAT_TIMES),
          switchMap(jwt => {
            return next.handle(this._tokenInterceptor.addToken(request, jwt));
          })
        );
    }
    // blocking and releasing all queries that started during refreshing process that was put on hold until invoking access token
    this.isRefreshing = !this.isRefreshing;
    // setting refresh token value to null to block all the ongoing requests until the value is different than null (filter method in else block)
    this.refreshTokenSubject.next(null);

    return this._authService.refreshToken()
      .pipe(
        switchMap((token: any) => {
          this.isRefreshing = !this.isRefreshing;
          this.refreshTokenSubject.next(token.access);
          return next.handle(this._tokenInterceptor.addToken(request, token.access));
        })
      );
  }
}
