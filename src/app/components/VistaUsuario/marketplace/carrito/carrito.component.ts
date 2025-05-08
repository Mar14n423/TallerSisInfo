import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';

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
  productosCarrito = [
    {
      id: 1,
      nombreP: 'Silla de Ruedas',
      descripcionP: 'Cómoda, liviana y resistente.',
      imagenU: 'assets/imagenes/sillaRuedas.jpg',
      precio: 10.99,
      cantidad: 1
    },
    {
      id: 2,
      nombreP: 'Muletas ajustables',
      descripcionP: 'Altura ajustable, livianas.',
      imagenU: 'assets/imagenes/muletas.jpg',
      precio: 15.5,
      cantidad: 2
    }
  ];

  ngOnInit(): void {}

  obtenerSubtotal(): number {
    return this.productosCarrito.reduce(
      (total, prod) => total + prod.precio * prod.cantidad,
      0
    );
  }
}
