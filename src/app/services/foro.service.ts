// foro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  private apiUrl = 'http://localhost:8080/api/foro';

  constructor(private http: HttpClient) {}

  obtenerPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publicaciones`);
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/publicacion`, publicacion);
  }

  agregarRespuesta(publicacionId: number, respuesta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/publicacion/${publicacionId}/respuesta`, respuesta);
  }

  enviarReporte(reporte: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reporte`, reporte);
  }
  obtenerReglas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reglas`);
  }

  obtenerTestimonios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/testimonios`);
  }

}