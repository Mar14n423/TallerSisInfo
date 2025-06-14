import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.cargarReportes();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-17.3895, -66.1568], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([-17.3895, -66.1568]).addTo(this.map)
      .bindPopup('Aquí puedes registrar un reporte.')
      .openPopup();

    this.map.on('dblclick', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (this.tempMarker) {
        this.map.removeLayer(this.tempMarker);
      }

      this.tempMarker = L.marker([lat, lng], { draggable: true }).addTo(this.map)
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
    this.http.get<any[]>('http://localhost:8080/api/reportes').subscribe({
      next: data => {
        this.reportes = data;
        this.reportes.forEach(reporte => {
          L.marker([reporte.latitud, reporte.longitud])
            .addTo(this.map)
            .bindPopup(`<b>${reporte.descripcion}</b>`);
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
          location.reload();
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