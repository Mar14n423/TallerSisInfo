import { Component, OnInit, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NEventos } from '../../VistaAdmin/eventos/eventos.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../../services/dialog.service';
import { EventosService } from '../../../services/eventos.service';
import { formatDate, getSelectedDate, templateEventosData } from '../../../helper/eventos';

@Component({
  selector: 'app-eventos-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './eventos-usuario.component.html',
  styleUrl: './eventos-usuario.component.scss'
})
export class EventosUsuarioComponent implements OnInit {
  private readonly totalItems = 42;
  currentMonth = signal(new Date());
  
  headers = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  eventosData: NEventos.Body[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.createEventosData();
    this.loadEventsForMonth();
  }

  previousMonth(): void {
    this.currentMonth.set(new Date(this.currentMonth().getFullYear(), this.currentMonth().getMonth() - 1, 1));
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.set(new Date(this.currentMonth().getFullYear(), this.currentMonth().getMonth() + 1, 1));
    this.updateCalendar();
  }

  private updateCalendar(): void {
    this.eventosData = [];
    this.createEventosData();
    this.loadEventsForMonth();
  }

  private async loadEventsForMonth(): Promise<void> {
    const year = this.currentMonth().getFullYear();
    const month = this.currentMonth().getMonth() + 1;
    
    try {
      const events = await this.eventosService.getEventosPorMes(year, month);
      this.assignEventsToCalendar(events);
    } catch (error) {
      console.error('Error cargando eventos:', error);
    }
  }

  private assignEventsToCalendar(events: NEventos.IEvent[]): void {
    this.eventosData.forEach(day => day.events = []);
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const dayIndex = this.eventosData.findIndex(
        day => this.isSameDay(day.date, eventDate)
      );
      if (dayIndex !== -1) {
        this.eventosData[dayIndex].events.push(event);
      }
    });
  }

  private createEventosData(): void {
    const current = this.currentMonth();
    const firstDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
    const lastDayPrev = new Date(current.getFullYear(), current.getMonth(), 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = lastDayPrev - i;
      const date = new Date(current.getFullYear(), current.getMonth() - 1, day);
      this.eventosData.push({
        ...templateEventosData(day, date),
        isCurrentMonth: false
      });
    }

    const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(current.getFullYear(), current.getMonth(), day);
      this.eventosData.push({
        ...templateEventosData(day, date),
        isCurrentDay: this.isSameDay(date, today),
        isCurrentMonth: true
      });
    }

    const remaining = this.totalItems - this.eventosData.length;
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(current.getFullYear(), current.getMonth() + 1, day);
      this.eventosData.push({
        ...templateEventosData(day, date),
        isCurrentMonth: false
      });
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
