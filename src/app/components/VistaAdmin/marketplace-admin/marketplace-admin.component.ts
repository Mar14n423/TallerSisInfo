import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAdminMkComponent } from '../dialog-admin-mk/dialog-admin-mk.component';
import { MarketplaceAdminService } from './marketplace-admin.service';


@Component({
  selector: 'app-marketplace-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './marketplace-admin.component.html',
  styleUrls: ['./marketplace-admin.component.scss']
})
export class MarketplaceAdminComponent implements OnInit {
  productos: any[] = [];
  cargando: boolean = true;

  constructor(
    private marketplaceAdminService: MarketplaceAdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.marketplaceAdminService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.cargando = false;
      }
    });
  }

  abrirDialogoProducto(producto?: any): void {
    const dialogRef = this.dialog.open(DialogAdminMkComponent, {
      width: '600px',
      data: producto || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id ? this.actualizarProducto(result) : this.crearProducto(result);
      }
    });
  }

  crearProducto(producto: any): void {
    this.marketplaceAdminService.crearProducto(producto).subscribe({
      next: () => this.cargarProductos(),
      error: (error) => console.error('Error al crear producto:', error)
    });
  }

  actualizarProducto(producto: any): void {
    this.marketplaceAdminService.actualizarProducto(producto.id, producto).subscribe({
      next: () => this.cargarProductos(),
      error: (error) => console.error('Error al actualizar producto:', error)
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.marketplaceAdminService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (error) => console.error('Error al eliminar producto:', error)
      });
    }
  }
}