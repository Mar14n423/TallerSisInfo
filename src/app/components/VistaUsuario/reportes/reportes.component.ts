import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import axios from 'axios';

// 👇 Corregir íconos para evitar errores 404
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

  ngOnInit(): void {
    this.initMap();
    this.cargarReportes();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-17.3895, -66.1568], 13); // Puedes cambiar coordenadas

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Esto es solo para probar visualmente
    L.marker([-17.3895, -66.1568]).addTo(this.map)
      .bindPopup('Aquí puedes registrar un reporte.')
      .openPopup();

    // Tu lógica real (reporte con doble clic)
    this.map.on('dblclick', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (this.tempMarker) {
        this.map.removeLayer(this.tempMarker);
      }

      this.tempMarker = L.marker([lat, lng], {
        draggable: true
      }).addTo(this.map)
        .bindPopup('Ubicación seleccionada')
        .openPopup();

      const descripcion = prompt("Ingresa la descripción del reporte:");
      if (descripcion) {
        axios.post('http://localhost:8080/api/reportes', {
          descripcion,
          latitud: lat,
          longitud: lng,
          fechaCreacion: new Date().toISOString()
        }).then(() => {
          alert('Reporte guardado');
          this.cargarReportes();
        }).catch(err => {
          console.error('Error al agregar reporte:', err);
        });
      }
    });
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
    if (confirm("¿Estás seguro de eliminar este reporte?")) {
      axios.delete(`http://localhost:8080/api/reportes/${id}`)
        .then(() => {
          alert('Reporte eliminado');
          location.reload(); // recarga todo
        })
        .catch(error => console.error('Error al eliminar reporte:', error));
    }
  }

  editarReporte(r: any): void {
    const nuevaDescripcion = prompt("Nueva descripción:", r.descripcion);
    if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== '') {
      axios.post(`http://localhost:8080/api/reportes`, {
        id: r.id,
        descripcion: nuevaDescripcion,
        latitud: r.latitud,
        longitud: r.longitud,
        fechaCreacion: r.fechaCreacion
      }).then(() => {
        alert('Reporte actualizado');
        this.cargarReportes();
      }).catch(err => console.error('Error al editar reporte:', err));
    }
  }
}
