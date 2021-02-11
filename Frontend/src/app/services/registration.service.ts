import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}session/registration/`, userData);
  }
}
