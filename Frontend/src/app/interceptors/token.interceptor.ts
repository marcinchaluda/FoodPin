import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../services/authorization.service';

@Injectable( { providedIn: 'root'} )
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authorizationService: AuthorizationService) {}

  // intercept process every outgoing request executed by http client
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._authorizationService.getJwtToken()) {
      // adding jwt to outgoing request, so it can be authorized
      request = this.addToken(request, this._authorizationService.getJwtToken());
    }
    return next.handle(request);
  }

  // method set request with new authorization bearer token
  public addToken(request: HttpRequest<any>, jwt: string): HttpRequest<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    });

    return request.clone({headers});
  }
}
