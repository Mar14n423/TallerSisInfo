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
    return axios.post(`${this.apiUrl}/login`, empresa)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.error('Error al iniciar sesión como empresa:', error);
        throw error;
      });
  }

  // ✅ Obtener empresa por ID
  obtenerEmpresaPorId(id: number) {
    return axios.get(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error al obtener la empresa con ID ${id}`, error);
        throw error;
      });
  }

  // ✅ Actualizar empresa
  actualizarEmpresa(id: number, empresaActualizada: any) {
    return axios.put(`${this.apiUrl}/${id}`, empresaActualizada)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error al actualizar la empresa con ID ${id}`, error);
        throw error;
      });
  }

  // ✅ Eliminar empresa
  eliminarEmpresa(id: number) {
    return axios.delete(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error al eliminar la empresa con ID ${id}`, error);
        throw error;
      });
  }
}
