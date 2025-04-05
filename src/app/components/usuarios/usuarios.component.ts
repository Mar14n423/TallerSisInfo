import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import axios from 'axios';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [CommonModule, MatCardModule]
})
export class UsuariosComponent implements OnInit {
  // Modelo simplificado sin campo 'activo'
  usuarios: Array<{
    id?: number;
    nombre: string;
    apellido?: string;
    correo: string;
    tipo?: string;  // Este es el campo que usaremos
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

  // Función mejorada para mostrar el tipo
  getTipoUsuario(tipo: string | undefined): string {
    if (!tipo) return 'Sin tipo definido';
    
    // Para manejar tanto 'ADMIN' como 'A' si es necesario
    const tipoUpper = tipo.toUpperCase();
    
    if (tipoUpper === 'ADMIN' || tipoUpper === 'A') return 'Administrador';
    if (tipoUpper === 'USER' || tipoUpper === 'U') return 'Usuario normal';
    
    return tipo; // Mostrar el valor original si no coincide
  }
}