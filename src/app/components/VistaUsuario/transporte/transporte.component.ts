import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import * as L from 'leaflet';

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
  styleUrls: ['./transporte.component.scss']
})
export class TransporteComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private routeLines: L.Polyline[] = [];

  rutas: Ruta[] = [
    {
      id: 'R001',
      nombre: 'Línea 1: Centro - Universidad',
      ubicacionInicio: 'Plaza Principal',
      ubicacionFin: 'Campus Universitario',
      coordenadasInicio: [-17.3895, -66.1568],
      coordenadasFin: [-17.3933, -66.1482],
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
      coordenadasInicio: [-17.3833, -66.1520],
      coordenadasFin: [-17.3960, -66.1600],
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
      coordenadasInicio: [-17.4000, -66.1500],
      coordenadasFin: [-17.3900, -66.1580],
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
      coordenadasInicio: [-17.3800, -66.1400],
      coordenadasFin: [-17.3950, -66.1650],
      tipoServicio: 'Circular',
      horarios: ['Cada 15 minutos de 07:00 a 19:00'],
      duracionEstimada: '60 minutos (circuito completo)',
      disponibilidad: 'Diario',
      descripcionVisual: 'Ruta circular que recorre el Anillo Periférico Este y conecta varios mercados centrales.',
    }
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

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-17.3895, -66.1568], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.dibujarRutas();
  }

  private dibujarRutas(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.routeLines.forEach(line => this.map.removeLayer(line));
    this.markers = [];
    this.routeLines = [];
    const customIcon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    this.resultadosBusqueda.forEach(ruta => {
      const markerInicio = L.marker(ruta.coordenadasInicio)
        .addTo(this.map)
        .bindPopup(`<b>${ruta.ubicacionInicio}</b><br>${ruta.nombre}`);
      
      const markerFin = L.marker(ruta.coordenadasFin)
        .addTo(this.map)
        .bindPopup(`<b>${ruta.ubicacionFin}</b><br>${ruta.nombre}`);

      this.markers.push(markerInicio, markerFin);

      const color = this.getColorTipo(ruta.tipoServicio);
      const line = L.polyline([ruta.coordenadasInicio, ruta.coordenadasFin], {
        color,
        weight: 5,
        opacity: 0.7,
        dashArray: ruta.tipoServicio === 'Circular' ? '10, 10' : undefined
      }).addTo(this.map);

      this.routeLines.push(line);
    });
    if (this.markers.length > 0) {
      const bounds = L.latLngBounds(this.markers.map(m => m.getLatLng()));
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
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
    } else {
      this.dibujarRutas();
    }
    this.rutaSeleccionada = null;
    this.ubicacionActiva = null;
  }

  seleccionarRuta(ruta: Ruta): void {
    this.rutaSeleccionada = ruta;
    const bounds = L.latLngBounds([ruta.coordenadasInicio, ruta.coordenadasFin]);
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  limpiarFiltros(): void {
    this.filtroUbicacion = '';
    this.filtroTipoServicio = '';
    this.resultadosBusqueda = [...this.rutas];
    this.mensajeError = '';
    this.rutaSeleccionada = null;
    this.ubicacionActiva = null;
    this.dibujarRutas();
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

  mostrarInfoUbicacion(ubicacion: string): void {
    this.ubicacionActiva = this.ubicacionActiva === ubicacion ? null : ubicacion;
  }

  getRutasPorUbicacion(ubicacion: string): Ruta[] {
    return this.rutas.filter(ruta => 
      ruta.ubicacionInicio === ubicacion || 
      ruta.ubicacionFin === ubicacion
    );
  }
}