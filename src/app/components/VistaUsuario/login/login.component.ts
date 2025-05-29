import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    try {
      // Llama a tu servicio para loguear y obtener la respuesta completa
      const response = await this.authService.login(this.email, this.password);

      if (!response) {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      } else {
        // ✅ GUARDAR EL ID DEL USUARIO EN LOCALSTORAGE
        localStorage.setItem('userId', response.id);

        // ✅ Guardar en localStorage si es usuario o empresa
        if (response.tipo === 'empresa') {
          localStorage.setItem('empresa', JSON.stringify(response));
        } else {
          localStorage.setItem('usuario', JSON.stringify(response));
        }

        // ✅ Verificar si es admin
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else if (response.tipo === 'empresa') {
          this.router.navigate(['/homecompany']);
        } else {
          this.router.navigate(['/profile']);
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      this.errorMessage = 'Error al conectar con el servidor';
    }
  }
}
