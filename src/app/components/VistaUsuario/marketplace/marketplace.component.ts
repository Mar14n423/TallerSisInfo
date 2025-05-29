import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MarketplaceService } from './marketplace.service';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  productosFiltrados: any[] = [];
  cargando: boolean = true;

  constructor(private marketplaceService: MarketplaceService) {}

  ngOnInit(): void {
    this.cargarTodosLosProductos();
  }

  cargarTodosLosProductos(): void {
    this.cargando = true;
    this.marketplaceService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        this.productosFiltrados = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.cargando = false;
      }
    });
  }
}
