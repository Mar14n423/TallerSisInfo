import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  
  constructor(private router: Router) {}

  async login(correo: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        correo,
        passwordHash: password // Asegúrate que coincida con el backend
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Respuesta del login:', response.data); // Para debug
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tipo', response.data.tipo);
        localStorage.setItem('userId', response.data.id);
        return true;
      }
      return false;
    } catch (error: unknown) {
        if (error instanceof Error) {
          const axiosError = error as AxiosError;
          console.error('Error en login:', axiosError.response?.data || axiosError.message);
        }
        return false;
      }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('tipo') === 'A';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}