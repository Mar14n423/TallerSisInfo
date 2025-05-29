import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  private apiUrl = 'http://localhost:8080/api/foro';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  obtenerPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publicaciones`, this.getAuthHeaders());
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/publicacion`, publicacion, this.getAuthHeaders());
  }

  agregarRespuesta(publicacionId: number, respuesta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/publicacion/${publicacionId}/respuesta`, respuesta, this.getAuthHeaders());
  }

  enviarReporte(reporte: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reporte`, reporte, this.getAuthHeaders());
  }

  obtenerReglas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reglas`, this.getAuthHeaders());
  }

  obtenerTestimonios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/testimonios`, this.getAuthHeaders());
  }
}
