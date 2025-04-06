import { Component, OnInit, effect,signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NEventos } from '../eventos/eventos.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../services/dialog.service';
import { EventosService } from '../../services/eventos.service';
import { formatDate, getSelectedDate, templateEventosData } from '../../helper/eventos';

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
export class EventosComponent implements OnInit {
  
  private totalItems = 42;
  private date = new Date();
  currentMonth = signal(new Date());

  
  headers: NEventos.Header = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  eventosData: NEventos.Body[] = [];

  constructor(
    private readonly dialogService: DialogService,
    private eventosService: EventosService
  ) {
    effect(() => {
      if (this.dialogService.getEvent) {
        this.handleEvent(this.dialogService.getEvent);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.createEventosData();
    await this.loadEventsForMonth();
  }
  // Métodos para cambiar de mes
  previousMonth(): void {
    this.currentMonth.set(new Date(
      this.currentMonth().getFullYear(),
      this.currentMonth().getMonth() - 1,
      1
    ));
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.set(new Date(
      this.currentMonth().getFullYear(),
      this.currentMonth().getMonth() + 1,
      1
    ));
    this.updateCalendar();
  }

  private updateCalendar(): void {
    this.eventosData = []; // Limpiamos los datos
    this.createEventosData();
    this.loadEventsForMonth();
  }
  private async loadEventsForMonth(): Promise<void> {
    const year = this.currentMonth().getFullYear();
    const month = this.currentMonth().getMonth();
    
    try {
      const events = await this.eventosService.getEventosPorMes(year, month +1);
      this.assignEventsToCalendar(events);
    } catch (error) {
      console.error('Error cargando eventos:', error);
    }
  }

  private assignEventsToCalendar(events: NEventos.IEvent[]): void {
    // Primero limpia todos los eventos existentes
    this.eventosData.forEach(day => day.events = []);
    
    // Asigna los nuevos eventos
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const dayIndex = this.eventosData.findIndex(
        day => day.day === eventDate.getDate() && 
              day.date.getMonth() === eventDate.getMonth() &&
              day.date.getFullYear() === eventDate.getFullYear()
      );
      
      if (dayIndex !== -1) {
        this.eventosData[dayIndex].events.push(event);
      }
    });
  }

  private async handleEvent(item: NEventos.IEvent): Promise<void> {
    if (!item.id) return;

    try {
      if (this.eventExists(item.id)) {
        const updatedEvent = await this.eventosService.actualizarEvento(item.id, item);
        this.updateEventInCalendar(updatedEvent);
      } else {
        const newEvent = await this.eventosService.crearEvento(item);
        this.addEventToCalendar(newEvent);
      }
    } catch (error) {
      console.error('Error al manejar evento:', error);
    }
  }

  private eventExists(id: string): boolean {
    return this.eventosData.some(day => 
      day.events.some(event => event.id === id)
    );
  }

  private updateEventInCalendar(updatedEvent: NEventos.IEvent): void {
    for (const day of this.eventosData) {
      const eventIndex = day.events.findIndex(e => e.id === updatedEvent.id);
      if (eventIndex !== -1) {
        if (formatDate(day.date) !== formatDate(new Date(updatedEvent.date))) {
          day.events.splice(eventIndex, 1);
          this.addEventToCalendar(updatedEvent);
        } else {
          day.events[eventIndex] = updatedEvent;
        }
        break;
      }
    }
  }

  private addEventToCalendar(event: NEventos.IEvent): void {
    const eventDate = new Date(event.date);
    const dayIndex = this.eventosData.findIndex(
      day => day.day === eventDate.getDate() && 
            day.date.getMonth() === eventDate.getMonth()
    );
    
    if (dayIndex !== -1) {
      this.eventosData[dayIndex].events.push(event);
    }
  }

  private createEventosData(): void {    
    const firstDayInMonth = getSelectedDate(this.currentMonth(), 1).getDay();
    const previousMonth = getSelectedDate(this.currentMonth()).getDate();
    
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

  async removeEvent(eventosIndex: number, eventIndex: number): Promise<void> {
    const event = this.eventosData[eventosIndex].events[eventIndex];
    if (event.id) {
      try {
        await this.eventosService.eliminarEvento(event.id);
        this.eventosData[eventosIndex].events.splice(eventIndex, 1);
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    }
  }

  openModal(): void {
    this.dialogService.openDialog();
  }

  openModalEdit(event: NEventos.IEvent): void {
    this.dialogService.openDialog(event);
  }

  
}
