// layout.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutComponent } from '../confirm-logout/confirm-logout.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  
  menuItems = [
    { 
      path: '/admin/dashboard', 
      title: 'Dashboard', 
      icon: 'fas fa-tachometer-alt'
    },
    { 
      path: '/admin/usuarios', 
      title: 'Usuarios', 
      icon: 'fas fa-users'
    },
    { 
      path: '/admin/eventos', 
      title: 'Eventos', 
      icon: 'fas fa-calendar-alt'
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  confirmLogout() {
    const dialogRef = this.dialog.open(ConfirmLogoutComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/login-admin']);
      }
    });
  }
}