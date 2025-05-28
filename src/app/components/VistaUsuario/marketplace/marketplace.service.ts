import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor() {}

  obtenerProductos() {
    return axios.get(`${this.apiUrl}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener productos:', error);
        throw error;
      });
  }

  obtenerProductoPorId(id: number): Promise<any> {
    return axios.get(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error al obtener producto con ID ${id}:`, error);
        throw error;
      });
  }
}
