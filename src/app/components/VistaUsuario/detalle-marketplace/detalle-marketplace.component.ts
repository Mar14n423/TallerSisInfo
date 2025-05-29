import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MarketplaceService } from '../marketplace/marketplace.service';
import { CarritoService, Producto } from '../marketplace/carrito/carrito.service';

@Component({
  selector: 'app-detalle-marketplace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './detalle-marketplace.component.html',
  styleUrls: ['./detalle-marketplace.component.scss']
})
export class DetalleMarketplaceComponent implements OnInit {
  producto: any = null;
  cargando = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private marketplaceService: MarketplaceService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarProducto(id);
  }

  cargarProducto(id: string | null): void {
    if (!id) {
      this.error = 'ID de producto no proporcionado';
      this.cargando = false;
      return;
    }

    this.marketplaceService.obtenerProductoPorId(+id).subscribe({
      next: (producto: any) => {
        this.producto = producto;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al cargar el producto:', error);
        this.error = 'Error al cargar los detalles del producto';
        this.cargando = false;
      }
    });
  }

  agregarAlCarrito(): void {
    if (!this.producto) return;

    const productoCarrito: Producto = {
      id: this.producto.id,
      nombreP: this.producto.nombreP,
      descripcionP: this.producto.descripcionP,
      imagenU: this.producto.imagenU,
      precio: this.producto.precio,
      cantidad: 1
    };

    this.carritoService.agregarProducto(productoCarrito);
    alert('Producto agregado al carrito de compras');
  }
}
