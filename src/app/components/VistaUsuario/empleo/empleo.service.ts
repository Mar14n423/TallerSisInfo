import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EmpleoService {
  private apiUrl = 'http://localhost:8080/api/ofertas';

  constructor() {}

  obtenerOfertas() {
    return axios.get(`${this.apiUrl}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener ofertas:', error);
        throw error;
      });
  }

  // Filtrar ofertas por ubicación
  filtrarPorUbicacion(ubicacion: string) {
    return axios.get(`${this.apiUrl}/filtrar/ubicacion/${ubicacion}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al filtrar por ubicación:', error);
        throw error;
      });
  }

  // Filtrar ofertas por tipo de contrato
  filtrarPorContrato(tipoContrato: string) {
    return axios.get(`${this.apiUrl}/filtrar/contrato/${tipoContrato}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al filtrar por contrato:', error);
        throw error;
      });
  }

  // Filtrar ofertas por estado
  filtrarPorEstado(estado: string) {
    return axios.get(`${this.apiUrl}/filtrar/estado/${estado}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al filtrar por estado:', error);
        throw error;
      });
  }

  obtenerOfertaPorId(id: number): Promise<any> {
    return axios.get(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error al obtener oferta con ID ${id}:`, error);
        throw error;
      });
  }

  crearOferta(oferta: any) {
    return axios.post(`${this.apiUrl}/crear`, oferta)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al crear oferta:', error);
        throw error;
      });
  }

  eliminarOferta(id: number) {
    return axios.delete(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al eliminar oferta:', error);
        throw error;
      });
  }
}
