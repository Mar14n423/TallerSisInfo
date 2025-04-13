import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas';

  constructor() {}

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
  loginEmpresa(empresa: any) {
    return axios.post('http://localhost:8080/api/empresas/login', empresa)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.error('Error al iniciar sesión como empresa:', error);
        throw error;
      });
  }
}
