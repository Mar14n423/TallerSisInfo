import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios'; // Cambia la URL base

  constructor() {}

  registrarUsuario(usuario: any) {
    return axios.post(`${this.apiUrl}/create`, usuario) // Endpoint para registro
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al registrar usuario', error);
        throw error;
      });
  }

  loginUsuario(usuario: any) {
    return axios.post(`${this.apiUrl}/login`, usuario) // Endpoint para login
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al iniciar sesión', error);
        throw error;
      });
  }
  actualizarTipoUsuario(id: number, tipo: string) {
    return axios.patch(`${this.apiUrl}/${id}`, { tipo })
      .then(response => response.data)
      .catch(error => {
        console.error('Error al actualizar tipo de usuario:', error);
        throw error;
      });
  }
}