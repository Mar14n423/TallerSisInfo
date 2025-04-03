import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/empresas'; // URL del backend para empresas

  constructor(private http: HttpClient) {}

  // Método para registrar una empresa (si lo necesitas más adelante)
  registrarEmpresa(empresa: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/registro`, empresa);
  }

  // Método para iniciar sesión de empresa
  iniciarSesionEmpresa(credenciales: { email: string; password: string }) {
    return this.http.post(this.apiUrl + '/empresas/iniciar-sesion', {
      correo: credenciales.email,
      passwordHash: credenciales.password
    }, { responseType: 'text' }); // importante para manejar mensajes string
  }

}
