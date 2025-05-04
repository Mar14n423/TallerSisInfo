import { Injectable } from '@angular/core';
import axios from 'axios';
import { NEventos } from '../components/VistaAdmin/eventos/eventos.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:8080/api/eventos'; // Ajusta el puerto según tu backend

  constructor() { }

  // Obtener todos los eventos
  getEventos() {
    return axios.get<NEventos.IEvent[]>(this.apiUrl)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener eventos', error);
        throw error;
      });
  }

  // Obtener eventos por rango de fechas (para el calendario)
  getEventosPorMes(year: number, month: number) {
    // Asegúrate que el mes es correcto (1-12)
    const startDate = new Date(Date.UTC(year, month - 1, 1)); // month -1 porque el backend espera 1-12
    const endDate = new Date(Date.UTC(year, month, 0)); // día 0 del mes siguiente = último día del mes actual
    
       // Convertir a ISO string completo (con hora)
    const startISO = startDate.toISOString();
    const endISO = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59).toISOString();

    return axios.get<NEventos.IEvent[]>(`${this.apiUrl}/rango`, {
      params: {
        inicio: startISO, // Formato YYYY-MM-DD
        fin: endISO
      }
    })
    .then(response =>{
      // Convertir las fechas de string a Date
      return response.data.map(event => ({
          ...event,
          date: new Date(event.date)
      }));
    })
    .catch(error => {
      console.error('Error al obtener eventos por mes:', error);
      throw error;
    });
  }

  // Crear un nuevo evento
  crearEvento(evento: NEventos.IEvent) {
    const eventToSend = {
      ...evento,
      date: new Date(evento.date).toISOString()
  };
  return axios.post<NEventos.IEvent>(this.apiUrl, eventToSend)
  .then(response => ({
      ...response.data,
      date: new Date(response.data.date) // Convertir a Date
  }));
  }

  // Actualizar evento
  actualizarEvento(id: string, evento: NEventos.IEvent) {
    const eventToSend = {
        ...evento,
        date: new Date(evento.date).toISOString()
    };
    return axios.put<NEventos.IEvent>(`${this.apiUrl}/${id}`, eventToSend)
        .then(response => ({
            ...response.data,
            date: new Date(response.data.date) // Convertir a Date
        }));
}

  // Eliminar evento
  eliminarEvento(id: string) {
    return axios.delete(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al eliminar evento', error);
        throw error;
      });
  }
}