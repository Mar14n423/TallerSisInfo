import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';
import { CommonModule } from '@angular/common'; // 👈 necesario para *ngFor

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
    imports: [CommonModule] // 👈 agrégalo aquí

})
export class ReportesComponent implements OnInit {
  private map!: L.Map;
  reportes: any[] = [];

  ngOnInit(): void {
    this.initMap();
    this.cargarReportes();
  }

  private initMap(): void {
    this.map = L.map('mapa').setView([-17.3895, -66.1568], 13); // Coordenadas de ejemplo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private cargarReportes(): void {
    axios.get('http://localhost:8080/api/reportes')
      .then(response => {
        this.reportes = response.data;

        this.reportes.forEach((reporte: any) => {
          L.marker([reporte.latitud, reporte.longitud])
            .addTo(this.map)
            .bindPopup(`<b>${reporte.descripcion}</b>`);
        });
      })
      .catch(error => console.error('Error al cargar reportes:', error));
  }

  eliminarReporte(id: number): void {
    axios.delete(`http://localhost:8080/api/reportes/${id}`)
      .then(() => {
        alert('Reporte eliminado');
        this.map.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) this.map.removeLayer(layer);
        });
        this.cargarReportes();
      })
      .catch(error => console.error('Error al eliminar reporte:', error));
  }

  agregarReporte(): void {
    const descripcion = prompt("Descripción del reporte:");
    const latitud = Number(prompt("Latitud:"));
    const longitud = Number(prompt("Longitud:"));

    if (descripcion && !isNaN(latitud) && !isNaN(longitud)) {
      axios.post('http://localhost:8080/api/reportes', {
        descripcion,
        latitud,
        longitud,
        fechaCreacion: new Date().toISOString()
      }).then(() => {
        alert('Reporte agregado');
        this.cargarReportes();
      }).catch(err => {
        console.error('Error al agregar reporte:', err);
      });
    }
  }
}
