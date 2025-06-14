import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  tipoUsuario: 'empresa' | 'usuario' | null = null;
  modoDaltonismo = false; // 🔸 Esto va dentro de la clase

  constructor(private router: Router) {}

  ngOnInit(): void {
    const empresa = localStorage.getItem('empresa');
    const usuario = localStorage.getItem('usuario');
    if (empresa) {
      this.tipoUsuario = 'empresa';
    } else if (usuario) {
      this.tipoUsuario = 'usuario';
    } else {
      this.tipoUsuario = null;
    }
  }

  logout(): void {
    localStorage.removeItem('empresa');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }

  // 🔸 Función toggle también dentro de la clase
  toggleDaltonismo(): void {
    this.modoDaltonismo = !this.modoDaltonismo;
    const body = document.body;

    if (this.modoDaltonismo) {
      body.classList.add('modo-daltonismo');
    } else {
      body.classList.remove('modo-daltonismo');
    }
  }
}
