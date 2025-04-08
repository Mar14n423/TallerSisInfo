import { Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { NEventos } from '../components/VistaAdmin/eventos/eventos.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogData = signal<NEventos.IEvent | null>(null);

  constructor(public dialog: MatDialog) {}

  openDialog(data?: NEventos.IEvent): void {
    this.dialog.open(DialogComponent, {
      data,
      width: '70vw'
    });
  }

  setEvent(item: NEventos.IEvent) {
    this.dialogData.set(item);
  }

  get getEvent() {
    return this.dialogData();
  }

}