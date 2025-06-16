import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private router: Router, private http: HttpClient) {}

  async login(correo: string, password: string): Promise<any> {
    try {
      const response: any = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, {
        correo,
        passwordHash: password
      }));

      console.log('Respuesta del login:', response);

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipo', response.tipo);
        localStorage.setItem('userId', response.id);
        return response;
      }

      return null;
    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      }));
    } catch (error) {
      console.warn('Error al notificar logout:', error);
    } finally {
      this.clearAuthData();
      this.router.navigate(['/']);
    }
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

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    localStorage.removeItem('userId');
  }
}
