import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleoService {
  private apiUrl = 'http://localhost:8080/api/ofertas';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerOfertas(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al obtener ofertas:', error);
        return throwError(() => error);
      })
    );
  }

  filtrarPorUbicacion(ubicacion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filtrar/ubicacion/${ubicacion}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al filtrar por ubicación:', error);
        return throwError(() => error);
      })
    );
  }

  filtrarPorContrato(tipoContrato: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filtrar/contrato/${tipoContrato}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al filtrar por contrato:', error);
        return throwError(() => error);
      })
    );
  }

  filtrarPorEstado(estado: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filtrar/estado/${estado}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al filtrar por estado:', error);
        return throwError(() => error);
      })
    );
  }

  obtenerOfertaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error(`Error al obtener oferta con ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  crearOferta(oferta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, oferta, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al crear oferta:', error);
        return throwError(() => error);
      })
    );
  }

  eliminarOferta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al eliminar oferta:', error);
        return throwError(() => error);
      })
    );
  }
}