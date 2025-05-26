import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { CarritoService, Producto } from './carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  productosCarrito: Producto[] = [];

    constructor(private carritoService: CarritoService) {}

    ngOnInit(): void {
      this.productosCarrito = this.carritoService.obtenerProductos();
    }

    obtenerSubtotal(): number {
      return this.carritoService.obtenerSubtotal();
    }

    eliminarDelCarrito(id: number): void {
      this.carritoService.eliminarProducto(id);
      this.productosCarrito = this.carritoService.obtenerProductos(); // Actualiza la lista
    }
}
