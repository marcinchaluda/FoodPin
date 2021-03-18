import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthorizationService} from '../services/authorization.service';

@Injectable( { providedIn: 'root'} )
export class TokenInterceptor implements HttpInterceptor {
  private _headers: HttpHeaders;

  constructor(private _authorizationService: AuthorizationService) {}

  // intercept process every outgoing request executed by http client
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this._authorizationService.getJwtToken());

    if (this._authorizationService.getJwtToken()) {
      // adding jwt to outgoing request, so it can be authorized
      request = this.addToken(request, this._authorizationService.getJwtToken());
    }
    return next.handle(request);
  }

  // method set request with new authorization bearer token
  public addToken(request: HttpRequest<any>, jwt: string): HttpRequest<any> {
    const headers = request.headers;
    // if (this._authorizationService.loggedUser$) {
    headers.append('Authorization', `Bearer ${jwt}`);
    // }
    // headers.append('Content-Type', 'application/json');
    return request.clone({
       headers
    });
  }
}
