import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { NEventos } from '../components/VistaAdmin/eventos/eventos.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:8080/api/eventos'; // Ajusta el puerto según tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los eventos
  getEventos(): Observable<NEventos.IEvent[]> {
    return this.http.get<NEventos.IEvent[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener eventos', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener eventos por rango de fechas (para el calendario)
  getEventosPorMes(year: number, month: number): Observable<NEventos.IEvent[]> {
    // Asegúrate que el mes es correcto (1-12)
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0));
    
    // Convertir a ISO string completo (con hora)
    const startISO = startDate.toISOString();
    const endISO = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59).toISOString();

    const params = new HttpParams()
      .set('inicio', startISO)
      .set('fin', endISO);

    return this.http.get<NEventos.IEvent[]>(`${this.apiUrl}/rango`, { params }).pipe(
      map(response => response.map(event => ({
        ...event,
        date: new Date(event.date)
      }))),
      catchError(error => {
        console.error('Error al obtener eventos por mes:', error);
        return throwError(() => error);
      })
    );
  }

  // Crear un nuevo evento
  crearEvento(evento: NEventos.IEvent): Observable<NEventos.IEvent> {
    const eventToSend = {
      ...evento,
      date: new Date(evento.date).toISOString()
    };
    
    return this.http.post<NEventos.IEvent>(this.apiUrl, eventToSend).pipe(
      map(response => ({
        ...response,
        date: new Date(response.date)
      }))
    );
  }

  // Actualizar evento
  actualizarEvento(id: string, evento: NEventos.IEvent): Observable<NEventos.IEvent> {
    const eventToSend = {
      ...evento,
      date: new Date(evento.date).toISOString()
    };
    
    return this.http.put<NEventos.IEvent>(`${this.apiUrl}/${id}`, eventToSend).pipe(
      map(response => ({
        ...response,
        date: new Date(response.date)
      }))
    );
  }

  // Eliminar evento
  eliminarEvento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar evento', error);
        return throwError(() => error);
      })
    );
  }
}