import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-marketplace',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-marketplace.component.html',
  styleUrls: ['./detalle-marketplace.component.scss']
})
export class DetalleMarketplaceComponent implements OnInit {

  idProducto: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.paramMap.get('id');
    console.log('ID del producto:', this.idProducto);
  }
}
