import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'any'
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public showLoader(): void {
    this.isLoading.next(true);
  }

  public hideLoader(): void {
    this.isLoading.next(false);
  }
}
