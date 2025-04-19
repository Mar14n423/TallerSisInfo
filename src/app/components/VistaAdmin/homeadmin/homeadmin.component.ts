import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule
  ],
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent {
  generatingReport = false;
  
  stats = [
    { icon: 'warning', value: 15, label: 'Reportes Pendientes' },
    { icon: 'star', value: 4.2, label: 'Rating Promedio' },
    { icon: 'check_circle', value: 32, label: 'Resueltos este Mes' },
    { icon: 'priority_high', value: 5, label: 'Críticos' }
  ];

  constructor(private router: Router) {}

  generateAccessibilityReport() {
    this.generatingReport = true;
    // Simular generación de reporte
    setTimeout(() => {
      this.generatingReport = false;
      // Aquí iría la lógica real para descargar el PDF
    }, 2000);
  }

  refreshStats() {
    // Aquí iría la llamada al backend para actualizar estadísticas
    console.log('Actualizando estadísticas...');
  }
}