import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsuarioService } from '../../VistaUsuario/register/usuario.service';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatMenuModule, MatIconModule]
})
export class UsuariosComponent implements OnInit {
  usuarios: Array<{
    id?: number;
    nombre: string;
    apellido?: string;
    correo: string;
    tipo?: string;
  }> = [];

  isLoading: boolean = true;
  error: string | null = null;
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient,private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.error = null;
    
    this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error al cargar usuarios:', error);
        this.error = 'Error al cargar los usuarios. Por favor intenta nuevamente.';
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.usuarios = data;
      }
    });
  }

  getNombreCompleto(usuario: {nombre: string, apellido?: string}): string {
    return `${usuario.nombre} ${usuario.apellido || ''}`.trim();
  }

  getTipoUsuario(tipo: string | undefined): string {
    if (!tipo) return 'Sin tipo definido';
    const tipoUpper = tipo.toUpperCase();
    if (tipoUpper === 'ADMIN' || tipoUpper === 'A') return 'Administrador';
    if (tipoUpper === 'USER' || tipoUpper === 'U') return 'Usuario';
    return tipo;
  }

  cambiarTipoUsuario(usuario: any, nuevoTipo: string): void {
    const tipoParaBackend = nuevoTipo === 'Administrador' ? 'A' : 'U';
    
    this.http.patch(`${this.apiUrl}/${usuario.id}`, 
      { tipo: tipoParaBackend },
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Error al actualizar usuario:', error);
        this.error = 'Error al actualizar el usuario. Por favor intenta nuevamente.';
        return throwError(() => error);
      })
    ).subscribe({
      next: () => {
        // Actualizar localmente sin recargar
        usuario.tipo = tipoParaBackend;
      }
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}