import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  estaLogueado: boolean = false;
  tipoUsuario: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.estaLogueado = this.authService.isAuthenticated();
    this.tipoUsuario = this.authService.getTipo();
  }

  cerrarSesion(): void {
    this.authService.logout();
    window.location.href = '/'; // redirecciona al home
  }
}
