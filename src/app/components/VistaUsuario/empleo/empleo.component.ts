import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleo',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule,FooterComponent, NavbarComponent, MatProgressBarModule ], // 🔹 Importamos Navbar y Footer
  templateUrl: './empleo.component.html',
  styleUrls: ['./empleo.component.scss']
})
export class EmpleoComponent {
   filtroCategoria: string = '';
   filtroUbicacion: string = '';
   filtroEmpresa: string = '';
   filtroContrato: string = '';   // 🆕 Tipo de contrato (ej: Tiempo completo, Freelance)
   filtroEstado: string = '';
 }
