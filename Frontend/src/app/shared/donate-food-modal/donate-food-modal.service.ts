import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonateFoodModalService {
  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public showModal(): void {
    this.isOpen$.next(true);
  }

  public hideModal(): void {
    this.isOpen$.next(false);
  }
}
