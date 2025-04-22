import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpleoService } from '../empleo/empleo.service'; // Reutiliza el servicio existente
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-detalle-trabajo',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, NavbarComponent, FooterComponent],
  templateUrl: './detalle-trabajo.component.html',
  styleUrls: ['./detalle-trabajo.component.scss']
})
export class DetalleTrabajoComponent implements OnInit {
  trabajo: any = null;
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private empleoService: EmpleoService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarTrabajo(id);
  }

  cargarTrabajo(id: string | null): void {
    if (!id) {
      this.error = 'ID de empleo no proporcionado';
      this.cargando = false;
      return;
    }

    this.cargando = true;
    this.empleoService.obtenerOfertaPorId(+id)
      .then(data => {
        this.trabajo = data;
        this.cargando = false;
      })
      .catch(error => {
        console.error('Error al cargar el trabajo:', error);
        this.error = 'Error al cargar los detalles del empleo';
        this.cargando = false;
      });
  }
}
