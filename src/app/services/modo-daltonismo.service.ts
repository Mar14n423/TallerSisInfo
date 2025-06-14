import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModoDaltonismoService {
  private modoDaltonismoSubject = new BehaviorSubject<boolean>(false);
  modoDaltonismo$ = this.modoDaltonismoSubject.asObservable();

  toggleModo() {
    const actual = this.modoDaltonismoSubject.getValue();
    this.modoDaltonismoSubject.next(!actual);
  }

  setModo(valor: boolean) {
    this.modoDaltonismoSubject.next(valor);
  }

  getModo(): boolean {
    return this.modoDaltonismoSubject.getValue();
  }
}
