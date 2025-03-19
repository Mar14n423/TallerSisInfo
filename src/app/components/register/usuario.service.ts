import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios/create';

  constructor() { }

  registrarUsuario(usuario: any) {
    return axios.post(this.apiUrl, usuario)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al registrar usuario', error);
        throw error;
      });
  }
}