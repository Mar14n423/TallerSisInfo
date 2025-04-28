import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../../../services/auth.service'; // <-- asegurarte que esté importado
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas';

constructor(private http: HttpClient, private authService: AuthService) { }

  // ✅ Registro de empresa
  registrarEmpresa(empresa: any) {
    return axios.post(`${this.apiUrl}/create`, empresa)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al registrar empresa', error);
        throw error;
      });
  }

  // ✅ Login de empresa
  loginEmpresa(empresa: any): Promise<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, empresa).toPromise().then(response => {
      if (response) {
        // Guardamos el token simulado, tipo y nombre
        this.authService.login('abc123', response.tipo, response.nombre);
      }
      return response;
    });
  }
}
