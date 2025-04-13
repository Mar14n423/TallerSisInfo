import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas'; // Ajusta la URL

  constructor(private http: HttpClient) {}

  // empresa.service.ts
  loginEmpresa(empresa: any): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/login`, empresa)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // ¡Convierte el error HTTP en un rechazo de promesa!
          return throwError(() => ({
            message: error.error || 'Credenciales incorrectas', // Mensaje del backend
            status: error.status, // 401, 404, etc.
          }));
        })
      )
      .toPromise();
  }
}
