import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public showLoader(): void {
    this.isLoading.next(true);
  }

  public hideLoader(): void {
    this.isLoading.next(false);
  }
}
