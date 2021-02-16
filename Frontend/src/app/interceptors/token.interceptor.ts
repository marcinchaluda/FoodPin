import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthorizationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
