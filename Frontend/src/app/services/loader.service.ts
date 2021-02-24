import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'any'
})
export class LoaderService {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public toggleLoader(): void {
    this.isLoading$.next(!this.isLoading$.value);
  }
}
