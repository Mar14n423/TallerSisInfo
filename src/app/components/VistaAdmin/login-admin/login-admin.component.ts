import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  hidePassword = true;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async login() {
    this.loading = true;
    this.loginError = false;
    
    try {
      const success = await this.authService.login(this.username, this.password);
      
      if (success && this.authService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.loginError = true;
      }
    } catch (error) {
      console.error('Error en login:', error);
      this.loginError = true;
    } finally {
      this.loading = false;
    }
  }
}