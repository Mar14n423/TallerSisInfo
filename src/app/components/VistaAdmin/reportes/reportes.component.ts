import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-reportes',
  standalone: true,
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  imports: [CommonModule]
})
export class ReportesComponent implements OnInit {
  private map!: L.Map;
  reportes: any[] = [];
  private tempMarker: L.Marker | null = null;
  private markers: L.Marker[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.cargarReportes();
  }

  private initMap(): void {
    const iconDefault = L.icon({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    // Inicializar mapa
    this.map = L.map('map').setView([-17.3895, -66.1568], 13);

    // Capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Marcador inicial
    L.marker([-17.3895, -66.1568], { icon: iconDefault })
      .addTo(this.map)
      .bindPopup('Aquí puedes registrar un reporte.')
      .openPopup();

    // Evento para agregar nuevos reportes
    this.map.on('dblclick', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (this.tempMarker) {
        this.map.removeLayer(this.tempMarker);
      }

      this.tempMarker = L.marker([lat, lng], { 
        draggable: true,
        icon: iconDefault
      }).addTo(this.map)
        .bindPopup('Ubicación seleccionada')
        .openPopup();

      const descripcion = prompt("Ingresa la descripción del reporte:");
      if (descripcion) {
        this.http.post('http://localhost:8080/api/reportes', {
          descripcion,
          latitud: lat,
          longitud: lng,
          fechaCreacion: new Date().toISOString()
        }).subscribe({
          next: () => {
            alert('Reporte guardado');
            this.cargarReportes();
          },
          error: err => console.error('Error al agregar reporte:', err)
        });
      }
    });
  }

  private cargarReportes(): void {
    // Limpiar marcadores existentes
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];

    this.http.get<any[]>('http://localhost:8080/api/reportes').subscribe({
      next: data => {
        this.reportes = data;
        this.reportes.forEach(reporte => {
          const marker = L.marker([reporte.latitud, reporte.longitud], {
            icon: L.icon({
              iconRetinaUrl: 'assets/marker-icon-2x.png',
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          })
            .addTo(this.map)
            .bindPopup(`<b>${reporte.descripcion}</b><br>${new Date(reporte.fechaCreacion).toLocaleString()}`);
          
          this.markers.push(marker);
        });
      },
      error: err => console.error('Error al cargar reportes:', err)
    });
  }

  eliminarReporte(id: number): void {
    if (confirm("¿Estás seguro de eliminar este reporte?")) {
      this.http.delete(`http://localhost:8080/api/reportes/${id}`).subscribe({
        next: () => {
          alert('Reporte eliminado');
          this.cargarReportes(); // Mejor que location.reload()
        },
        error: err => console.error('Error al eliminar reporte:', err)
      });
    }
  }

  editarReporte(r: any): void {
    const nuevaDescripcion = prompt("Nueva descripción:", r.descripcion);
    if (nuevaDescripcion?.trim()) {
      this.http.post(`http://localhost:8080/api/reportes`, {
        id: r.id,
        descripcion: nuevaDescripcion,
        latitud: r.latitud,
        longitud: r.longitud,
        fechaCreacion: r.fechaCreacion
      }).subscribe({
        next: () => {
          alert('Reporte actualizado');
          this.cargarReportes();
        },
        error: err => console.error('Error al editar reporte:', err)
      });
    }
  }
}