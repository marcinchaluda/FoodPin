import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";

@Injectable( { providedIn: "root"} )
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthorizationService) {}

  // intercept process every outgoing request executed by http client
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._authService.getJwtToken()) {
      // adding jwt to outgoing request, so it can be authorized
      request = this.addToken(request, this._authService.getJwtToken());
    }
    return next.handle(request);
  }

  //method set request with new authorization bearer token
  public addToken(request: HttpRequest<any>, jwt: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${jwt}`)
    });
  }
}
