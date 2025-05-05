import { Component, OnInit, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NEventos } from '../eventos/eventos.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../../services/dialog.service';
import { EventosService } from '../../../services/eventos.service';
import { formatDate, getSelectedDate, templateEventosData } from '../../../helper/eventos';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  private readonly totalItems = 42; // 6 semanas
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

    try{
      const allEvents= await this.eventosService.getEventos();
      this.assignEventsToCalendar(allEvents);
    } catch(error){
      console.error('Error cargando todos los eventos', error);
    }
  }

  // Métodos de navegación
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

  goToCurrentMonth(): void {
    this.currentMonth.set(new Date());
    this.updateCalendar();
  }

  private updateCalendar(): void {
    this.eventosData = [];
    this.createEventosData();
    this.loadEventsForMonth();
  }

  // Carga de eventos
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
        day => day.day === eventDate.getDate() && 
              day.date.getMonth() === eventDate.getMonth() &&
              day.date.getFullYear() === eventDate.getFullYear()
      );
      
      if (dayIndex !== -1) {
        this.eventosData[dayIndex].events.push(event);
      }
    });
  }

  // Generación de la estructura del calendario
  private createEventosData(): void {
    const currentMonth = this.currentMonth();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    // 1. Días del mes anterior
    const lastDayOfPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i;
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, day);
      this.eventosData.push({
        ...templateEventosData(day, date),
        isCurrentMonth: false
      });
    }

    // 2. Días del mes actual
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const today = new Date();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      this.eventosData.push({
        ...templateEventosData(day, date),
        isCurrentDay: this.isSameDay(date, today),
        isCurrentMonth: true
      });
    }

    // 3. Días del próximo mes para completar la cuadrícula
    const remainingDays = this.totalItems - this.eventosData.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
      this.eventosData.push({
        ...templateEventosData(day, date),
        isCurrentMonth: false
      });
    }
  }

  // Manejo de eventos
  private async handleEvent(item: NEventos.IEvent): Promise<void> {
    if (!item.id) return;

    try {
        // Asegurar que la fecha es un objeto Date válido
        const eventToProcess = {
            ...item,
            date: item.date instanceof Date ? item.date : new Date(item.date)
        };

        if (this.eventExists(item.id)) {
            const updatedEvent = await this.eventosService.actualizarEvento(item.id, eventToProcess);
            this.updateEventInCalendar(updatedEvent);
        } else {
            const newEvent = await this.eventosService.crearEvento(eventToProcess);
            this.addEventToCalendar(newEvent);
        }
    } catch (error) {
        console.error('Error al manejar evento:', error);
    }
}
  private updateEventInCalendar(updatedEvent: NEventos.IEvent): void {
    for (const day of this.eventosData) {
      const eventIndex = day.events.findIndex(e => e.id === updatedEvent.id);
      if (eventIndex !== -1) {
        if (!this.isSameDay(day.date, new Date(updatedEvent.date))) {
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
      day => this.isSameDay(day.date, eventDate)
    );
    
    if (dayIndex !== -1) {
      this.eventosData[dayIndex].events.push(event);
    }
  }

  // Helpers
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  }

  private eventExists(id: string): boolean {
    return this.eventosData.some(day => 
      day.events.some(event => event.id === id)
    );
  }

  // Métodos públicos
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
