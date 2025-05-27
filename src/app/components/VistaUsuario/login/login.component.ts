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
    private authService: AuthService, // Inyectar AuthService
    private router: Router
  ) {}

  async onSubmit() {
    try {
      const success = await this.authService.login(this.email, this.password);
      
      if (!success) {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      } else {
        // Verificar si es admin o usuario normal
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
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