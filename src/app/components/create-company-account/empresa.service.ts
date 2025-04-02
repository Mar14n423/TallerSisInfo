import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas'; // Cambia la URL base

  constructor() {}

  // Método para registrar una empresa
  registrarEmpresa(empresa: any) {
    return axios.post(`${this.apiUrl}/create`, empresa) // Endpoint para registro de empresa
      .then((response) => response.data) // Devuelve los datos de la respuesta
      .catch((error) => {
        console.error('Error al registrar empresa', error);
        throw error; // Lanza el error para manejarlo en el componente
      });
  }

  // Método para el login de la empresa
  loginEmpresa(empresa: any) {
    return axios.post(`${this.apiUrl}/login`, empresa) // Endpoint para login de empresa
      .then((response) => response.data) // Devuelve los datos de la respuesta
      .catch((error) => {
        console.error('Error al iniciar sesión', error);
        throw error; // Lanza el error para manejarlo en el componente
      });
  }
}
