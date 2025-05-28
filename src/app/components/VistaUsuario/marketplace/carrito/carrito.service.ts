import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombreP: string;
  descripcionP: string;
  imagenU: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosCarrito: Producto[] = [];

  obtenerProductos(): Producto[] {
    return this.productosCarrito;
  }

  agregarProducto(producto: Producto) {
    const existente = this.productosCarrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      this.productosCarrito.push({ ...producto });
    }
  }

  eliminarProducto(id: number): void {
    this.productosCarrito = this.productosCarrito.filter((p: Producto) => p.id !== id);
  }

  obtenerSubtotal(): number {
    return this.productosCarrito.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
  }

  limpiarCarrito() {
    this.productosCarrito = [];
  }
}
