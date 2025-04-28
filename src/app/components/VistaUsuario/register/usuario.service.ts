import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service'; //

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios'; // Cambia la URL base


constructor(private http: HttpClient, private authService: AuthService) { }

  registrarUsuario(usuario: any) {
    return axios.post(`${this.apiUrl}/create`, usuario) // Endpoint para registro
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al registrar usuario', error);
        throw error;
      });
  }

  loginUsuario(usuario: any): Promise<any> {
                return this.http.post<any>(`${this.apiUrl}/login`, usuario).toPromise().then(response => {
                  if (response) {
                    // Guardamos el token simulado, tipo y nombre
                    this.authService.login('abc123', response.tipo, response.nombre);
                  }
                  return response;
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
  obtenerUsuarioPorId(id: number) {
    return axios.get(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
      });
  }
actualizarUsuario(id: number, usuarioActualizado: any) {
  return axios.put(`${this.apiUrl}/${id}`, usuarioActualizado)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al actualizar usuario:', error);
      throw error;
    });
}


}
