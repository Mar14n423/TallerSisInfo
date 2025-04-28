
// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(token: string, tipo: string, nombre: string): void {
    localStorage.setItem('auth', JSON.stringify({ token, tipo, nombre }));
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth');
  }

  getTipo(): string | null {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data).tipo : null;
  }

  getNombre(): string | null {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data).nombre : null;
  }

  getToken(): string | null {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data).token : null;
  }
}
