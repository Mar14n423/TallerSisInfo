import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NEventos } from '../../app/components/eventos/eventos.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private eventSubject = new BehaviorSubject<NEventos.IEvent | null>(null);
  getEvent = this.eventSubject.asObservable();

  openDialog(event?: NEventos.IEvent) {
    this.eventSubject.next(event || null);
  }

  closeDialog() {
    this.eventSubject.next(null);
  }
}
