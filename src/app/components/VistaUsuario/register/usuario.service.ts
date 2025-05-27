import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  private manejarError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => error);
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, usuario)
      .pipe(
        catchError(this.manejarError)
      );
  }

  loginUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, usuario)
      .pipe(
        catchError(this.manejarError)
      );
  }

 actualizarTipoUsuario(id: number, tipo: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  return this.http.patch(`${this.apiUrl}/${id}`, { tipo }, { headers }).pipe(
    catchError(this.manejarError)
  );
}

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.manejarError)
      );
  }

  actualizarUsuario(id: number, usuarioActualizado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuarioActualizado)
      .pipe(
        catchError(this.manejarError)
      );
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.manejarError)
      );
  }
}
