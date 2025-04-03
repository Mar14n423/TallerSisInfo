import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NEventos } from '../eventos/eventos.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../services/dialog.service';
import { createEvent, findEvent, formatDate, getSelectedDate, updateEvent, templateEventosData } from '../../helper/eventos';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    FooterComponent, 
    NavbarComponent,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent {
  
  private totalItems = 42;
  private date = new Date();
  private findEvent = findEvent;

  headers: NEventos.Header = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  eventosData: NEventos.Body[] = [];

  constructor(private readonly dialogService: DialogService) {
    this.createEventosData();
    effect(() => {
      if (this.dialogService.getEvent) {
        this.handleEvent(this.dialogService.getEvent);
      }
    });
  }

  private handleEvent(item: NEventos.IEvent) {
    const newEventosData = [...this.eventosData];
    const foundEvent = this.findEvent(newEventosData, item);

    if (!foundEvent) {
      createEvent(newEventosData, item);
    } else {
      updateEvent(newEventosData, item, foundEvent);
    }

    this.eventosData = newEventosData;
  }

  private createEventosData() {    
    const firstDayInMonth = getSelectedDate(this.date, 1).getDay();
    const previousMonth = getSelectedDate(this.date).getDate();
    
    for (let index = firstDayInMonth; index > 0; index--) {      
      this.eventosData.push(templateEventosData(previousMonth - (index - 1), getSelectedDate(this.date, previousMonth - (index - 1), -1)));
    }

    const daysInMonth = getSelectedDate(this.date, 0, 1).getDate();
    
    for (let index = 1; index <= daysInMonth; index++) {
      const newDate = getSelectedDate(this.date, index);            

      this.eventosData.push({
        ...templateEventosData(index, newDate),
        isCurrentDay: formatDate(this.date) === formatDate(newDate),
        isCurrentMonth: true,
      });
    }

    const eventosLength = this.eventosData.length;

    for (let index = 1; index <= (this.totalItems - eventosLength); index++) {
      this.eventosData.push(templateEventosData(index, getSelectedDate(this.date, index, 1)));
    }
  }

  removeEvent(eventosIndex: number, eventIndex: number) {
    const newEventosData = [...this.eventosData];
    newEventosData[eventosIndex].events.splice(eventIndex, 1);
    this.eventosData = newEventosData;
  }

  openModal() {
    this.dialogService.openDialog();
  }

  openModalEdit(event: NEventos.IEvent) {
    this.dialogService.openDialog(event);
  }
}
