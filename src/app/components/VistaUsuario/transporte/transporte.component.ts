import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Ruta } from './transporte.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss'
})
export class TransporteComponent implements OnInit {
  rutas: Ruta[] = [
    {
      id: 'R001',
      nombre: 'Línea 1: Centro - Universidad',
      ubicacionInicio: 'Plaza Principal',
      ubicacionFin: 'Campus Universitario',
      tipoServicio: 'Regular',
      horarios: ['07:00', '08:30', '10:00', '11:30', '14:00', '15:30', '17:00', '18:30'],
      duracionEstimada: '30 minutos',
      disponibilidad: 'Lunes a Viernes',
      descripcionVisual: 'Desde la Plaza Principal, pasando por la Av. Libertador hasta el Campus Universitario.',
    },
    {
      id: 'R002',
      nombre: 'Línea 2: Zona Norte - Hospital',
      ubicacionInicio: 'Barrio Norte',
      ubicacionFin: 'Hospital Central',
      tipoServicio: 'Regular',
      horarios: ['06:30', '08:00', '09:30', '11:00', '13:30', '15:00', '16:30', '18:00'],
      duracionEstimada: '45 minutos',
      disponibilidad: 'Lunes a Sábado',
      descripcionVisual: 'Inicia en Barrio Norte, recorriendo la Calle 10 y la Av. Siles hasta llegar al Hospital Central.',
    },
    {
      id: 'R003',
      nombre: 'Expreso Sur: Terminal - Centro',
      ubicacionInicio: 'Terminal de Buses',
      ubicacionFin: 'Plaza 14 de Septiembre',
      tipoServicio: 'Expreso',
      horarios: ['07:30', '09:00', '12:00', '15:00', '17:30'],
      duracionEstimada: '20 minutos',
      disponibilidad: 'Diario',
      descripcionVisual: 'Servicio directo desde la Terminal de Buses hasta la Plaza 14 de Septiembre por la vía rápida.',
    },
    {
      id: 'R004',
      nombre: 'Circular Este: Anillo - Mercados',
      ubicacionInicio: 'Anillo Periférico Este',
      ubicacionFin: 'Mercado La Cancha',
      tipoServicio: 'Circular',
      horarios: ['Cada 15 minutos de 07:00 a 19:00'],
      duracionEstimada: '60 minutos (circuito completo)',
      disponibilidad: 'Diario',
      descripcionVisual: 'Ruta circular que recorre el Anillo Periférico Este y conecta varios mercados centrales.',
    },
  ];

  filtroUbicacion: string = '';
  filtroTipoServicio: string = '';
  resultadosBusqueda: Ruta[] = [];
  rutaSeleccionada: Ruta | null = null;
  mensajeError: string = '';
  ubicacionActiva: string | null = null; 

  tiposDeServicio: string[] = ['Regular', 'Expreso', 'Circular', 'Todos'];
  ubicaciones: string[] = ['Plaza Principal', 'Campus Universitario', 'Barrio Norte', 
                          'Hospital Central', 'Terminal de Buses', 'Plaza 14 de Septiembre', 
                          'Anillo Periférico Este', 'Mercado La Cancha'];

  ngOnInit(): void {
    this.resultadosBusqueda = [...this.rutas];
  }

  getUbicacionX(ubicacion: string): number {
    const index = this.ubicaciones.indexOf(ubicacion);
    if (index === -1) return 0;
    const col = index % 3;
    return 15 + (col * 35);
  }

  getUbicacionY(ubicacion: string): number {
    const index = this.ubicaciones.indexOf(ubicacion);
    if (index === -1) return 0;
    const row = Math.floor(index / 3);
    return 15 + (row * 30);
  }

  obtenerEstiloRuta(ruta: Ruta): any {
    const startX = this.getUbicacionX(ruta.ubicacionInicio);
    const startY = this.getUbicacionY(ruta.ubicacionInicio);
    const endX = this.getUbicacionX(ruta.ubicacionFin);
    const endY = this.getUbicacionY(ruta.ubicacionFin);
  
    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const length = Math.sqrt(dx * dx + dy * dy);
  
    return {
      'left': `${Math.min(startX, endX)}%`,
      'top': `${Math.min(startY, endY)}%`,
      'width': `${length}%`,
      'transform': `rotate(${angle}deg)`
    };
  }

  mostrarInfoUbicacion(ubicacion: string): void {
    this.ubicacionActiva = this.ubicacionActiva === ubicacion ? null : ubicacion;
  }

  getRutasPorUbicacion(ubicacion: string): Ruta[] {
    return this.rutas.filter(ruta => 
      ruta.ubicacionInicio === ubicacion || 
      ruta.ubicacionFin === ubicacion
    );
  }

  buscarRutas(): void {
    this.mensajeError = '';
    this.resultadosBusqueda = this.rutas.filter(ruta => {
      const busca = this.filtroUbicacion.toLowerCase() === 'todos' ||
                   ruta.ubicacionInicio.toLowerCase().includes(this.filtroUbicacion.toLowerCase()) ||
                   ruta.ubicacionFin.toLowerCase().includes(this.filtroUbicacion.toLowerCase()) ||
                   ruta.nombre.toLowerCase().includes(this.filtroUbicacion.toLowerCase());
      const filtraTipo = this.filtroTipoServicio.toLowerCase() === 'todos' ||
                         ruta.tipoServicio.toLowerCase() === this.filtroTipoServicio.toLowerCase();
      return busca && filtraTipo;
    });

    if (this.resultadosBusqueda.length === 0) {
      this.mensajeError = 'No se encontraron rutas con los criterios de búsqueda.';
    }
    this.rutaSeleccionada = null;
    this.ubicacionActiva = null; 
  }

  seleccionarRuta(ruta: Ruta): void {
    this.rutaSeleccionada = ruta;
  }

  limpiarFiltros(): void {
    this.filtroUbicacion = '';
    this.filtroTipoServicio = '';
    this.resultadosBusqueda = [...this.rutas];
    this.mensajeError = '';
    this.rutaSeleccionada = null;
    this.ubicacionActiva = null;
  }

  getTipoServicioClass(tipo: string): string {
    return tipo.toLowerCase();
  }

  getColorTipo(tipo: string): string {
    const colores: Record<string, string> = {
      'Regular': '#1976d2',
      'Expreso': '#ff9800',
      'Circular': '#9c27b0'
    };
    return colores[tipo] || '#1976d2';
  }
}