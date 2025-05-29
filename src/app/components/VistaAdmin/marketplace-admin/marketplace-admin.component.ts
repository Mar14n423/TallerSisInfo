import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MarketplaceAdminService } from './marketplace-admin.service';

@Component({
  selector: 'app-marketplace-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './marketplace-admin.component.html',
  styleUrls: ['./marketplace-admin.component.scss']
})
export class MarketplaceAdminComponent implements OnInit {
  productos: any[] = [];
  cargando: boolean = true;

  constructor(private marketplaceAdminService: MarketplaceAdminService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.marketplaceAdminService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.cargando = false;
      }
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.marketplaceAdminService.eliminarProducto(id).subscribe({
        next: () => {
          // Elimina el producto localmente para actualizar la vista
          this.productos = this.productos.filter(p => p.id !== id);
        },
        error: (error: any) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  abrirFormulario(): void {
      alert('Aquí iría el formulario para agregar producto (por implementar)');
  }
}
