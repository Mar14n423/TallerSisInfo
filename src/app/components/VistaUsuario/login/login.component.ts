import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSlideToggleModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  hidePassword: boolean = true;
  daltonicMode: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    try {
      const response = await this.authService.login(this.email, this.password);

      if (!response) {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      } else {
        localStorage.setItem('userId', response.id);
        if (response.tipo === 'empresa') {
          localStorage.setItem('empresa', JSON.stringify(response));
        } else {
          localStorage.setItem('usuario', JSON.stringify(response));
        }
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

  toggleColorMode() {
  
  }
}