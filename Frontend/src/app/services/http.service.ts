import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public _apiPost(uri: string, data: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}${uri}`, data);
  }

  public _apiGet(uri: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}${uri}`);
  }

  public _apiPatch(uri: string, data: any): Observable<any> {
    return this._http.patch<any>(`${this._apiUrl}${uri}`, data);
  }
}
