import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private REPEAT_TIMES = 1;

  constructor(private _toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(this.REPEAT_TIMES),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `${error.error.message} `;
        } else {
          errorMessage = `${error.status}; `;
          Object.values(error.error).forEach(err => {
            errorMessage += err[0] + " ";
          });
        }
        this._toastr.error(errorMessage);
        return throwError(errorMessage);
      }),
    );
  }
}
