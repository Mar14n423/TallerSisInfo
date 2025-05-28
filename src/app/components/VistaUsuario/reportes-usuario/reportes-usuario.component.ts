import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-reportes-usuario',
  standalone: true,
  templateUrl: './reportes-usuario.component.html',
  styleUrls: ['./reportes-usuario.component.scss'],
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ]
})
export class ReportesUsuarioComponent implements OnInit {
  reportes: any[] = [];
  copiados: boolean[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  private cargarReportes(): void {
    this.http.get<any[]>('http://localhost:8080/api/reportes').subscribe({
      next: data => {
        this.reportes = data;
        this.copiados = new Array(this.reportes.length).fill(false);

        setTimeout(() => {
          this.reportes.forEach((reporte, i) => {
            const mapId = `map-${i}`;
            const map = L.map(mapId).setView([reporte.latitud, reporte.longitud], 19);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            L.marker([reporte.latitud, reporte.longitud], {
              icon: L.divIcon({
                className: 'custom-icon',
                html: '<span class="icon-cross">❌</span>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              })
            }).addTo(map).bindPopup(`<b>${reporte.descripcion}</b>`);
          });
        }, 100);
      },
      error: err => console.error('Error al cargar reportes:', err)
    });
  }

  copiarCoordenadas(index: number, lat: number, lng: number): void {
    const texto = `Latitud: ${lat}, Longitud: ${lng}`;
    navigator.clipboard.writeText(texto).then(() => {
      this.copiados[index] = true;
      setTimeout(() => this.copiados[index] = false, 2000);
    }).catch(err => console.error('Error al copiar', err));
  }
}
