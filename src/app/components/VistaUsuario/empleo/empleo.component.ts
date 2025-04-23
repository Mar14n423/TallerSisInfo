import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { EmpleoService } from './empleo.service';

@Component({
  selector: 'app-empleo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatProgressBarModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './empleo.component.html',
  styleUrls: ['./empleo.component.scss']
})
export class EmpleoComponent implements OnInit {
  // Filtros
  filtroUbicacion: string = '';
  filtroContrato: string = '';
  filtroEstado: string = '';

  // Datos
  todasLasOfertas: any[] = [];
  ofertasFiltradas: any[] = [];
  cargando: boolean = true;

  constructor(private empleoService: EmpleoService) {}

  ngOnInit(): void {
    this.cargarTodasLasOfertas();
  }

  cargarTodasLasOfertas(): void {
    this.cargando = true;
    this.empleoService.obtenerOfertas()
      .then(data => {
        this.todasLasOfertas = data;
        this.ofertasFiltradas = [...data];
        this.cargando = false;
      })
      .catch(error => {
        console.error('Error al cargar ofertas:', error);
        this.cargando = false;
      });
  }

  aplicarFiltros(): void {
    this.cargando = true;

    let resultados = [...this.todasLasOfertas];

    if (this.filtroUbicacion) {
      resultados = resultados.filter(oferta =>
        oferta.ubicacion === this.filtroUbicacion
      );
    }

    if (this.filtroContrato) {
      resultados = resultados.filter(oferta =>
        oferta.tipoContrato === this.filtroContrato
      );
    }

    if (this.filtroEstado) {
      resultados = resultados.filter(oferta =>
        oferta.estado === this.filtroEstado
      );
    }

    this.ofertasFiltradas = resultados;
    this.cargando = false;
  }

  limpiarFiltros(): void {
    this.filtroUbicacion = '';
    this.filtroContrato = '';
    this.filtroEstado = '';
    this.ofertasFiltradas = [...this.todasLasOfertas];
  }
}
