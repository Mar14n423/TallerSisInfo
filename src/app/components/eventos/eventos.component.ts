import { Component, effect, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NEventos } from '../eventos/eventos.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../services/dialog.service';
import { createEvent, findEvent, formatDate, getSelectedDate, updateEvent } from '../../helper/eventos';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, FooterComponent, NavbarComponent, MatTooltipModule, MatMenuModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventosComponent {
  
  private totalItems = 42;
  private date = new Date();

  headers: NEventos.Header = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  eventosData: NEventos.Body[] = [];

  constructor(private readonly dialogService: DialogService) {
    this.createEventosData();
    this.dialogService.getEvent.subscribe(event => {
      if (event) {
        this.handleEvent(event);
      }
    });
  }

  private handleEvent(item: NEventos.IEvent) {
    const newEventosData = [...this.eventosData];
    const foundEvent = findEvent(newEventosData, item.date);

    if (!foundEvent) {
      createEvent(newEventosData, item);
    } else {
      updateEvent(newEventosData, item, foundEvent);
    }

    this.eventosData = newEventosData;
  }

  private createEventosData() {
    const firstDayInMonth = getSelectedDate(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    const previousMonth = getSelectedDate(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    for (let index = firstDayInMonth; index > 0; index--) {
      this.eventosData.push({
        day: previousMonth - (index - 1),
        isCurrentMonth: false,
        isCurrentDay: false,
        events: [],
        date: getSelectedDate(this.date.getFullYear(), this.date.getMonth() - 1, previousMonth - (index - 1))
      });
    }
    
    const daysInMonth = getSelectedDate(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (let index = 1; index <= daysInMonth; index++) {
      this.eventosData.push({
        day: index,
        isCurrentMonth: true,
        isCurrentDay: formatDate(this.date) === formatDate(getSelectedDate(this.date.getFullYear(), this.date.getMonth(), index)),
        events: [],
        date: getSelectedDate(this.date.getFullYear(), this.date.getMonth(), index)
      });
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
