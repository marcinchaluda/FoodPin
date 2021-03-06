import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoaderService} from "../shared/loader/loader.service";
import {finalize} from "rxjs/operators";

@Injectable(
  { providedIn: "any"}
)
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.showLoader();
    return next.handle(request)
      .pipe(
        finalize(() => {
          this._loaderService.hideLoader();
        }),
      );
  }
}
