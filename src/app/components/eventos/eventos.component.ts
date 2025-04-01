import { Component, effect } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NCalendar } from '../eventos/eventos.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
//import { createEvent, findEvent, formatDate, getSelectedDate, updateEvent, templateCalendarData } from '../../helper/calendar';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, FooterComponent, NavbarComponent, MatTooltipModule,MatMenuModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent {
  
  private totalItems = 42;
  private date = new Date();
  //private findEvent = findEvent;

  headers: NCalendar.Header = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  eventosData: NCalendar.Body[] = [];

  

  removeEvent(eventosIndex: number, eventIndex: number) {
    const newEventosData = [...this.eventosData];
    newEventosData[eventosIndex].events.splice(eventIndex, 1);
    this.eventosData = newEventosData;
  }

}
