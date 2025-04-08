import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import axios from 'axios';

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

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  async cargarUsuarios(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const response = await axios.get(this.apiUrl);
      this.usuarios = response.data;
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      this.error = 'Error al cargar los usuarios. Por favor intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
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

  async cambiarTipoUsuario(usuario: any, nuevoTipo: string): Promise<void> {
    try {
      const tipoParaBackend = nuevoTipo === 'Administrador' ? 'A' : 'U';
      
      await axios.patch(`${this.apiUrl}/${usuario.id}`, { 
        tipo: tipoParaBackend 
      });
      
      // Actualizar localmente sin recargar
      usuario.tipo = tipoParaBackend;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      this.error = 'Error al actualizar el usuario. Por favor intenta nuevamente.';
    }
  }
}